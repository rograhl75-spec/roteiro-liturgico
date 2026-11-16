"""Lê um cartão de rito (RITO - ….docx) e devolve o roteiro no formato da página
({titulo, secoes:[{titulo, linhas:[[papel, texto]]}]}) para abrir na tela,
imprimir e enviar em PDF como os outros documentos.
  python3 cartao_json.py RITO.docx  → imprime o JSON
"""
import re, sys, json, zipfile

PAPEIS = [(r'^S\.\s*', 'Sacerdote'), (r'^℟\.\s*', 'Todos'), (r'^℣\.\s*', 'Sacerdote'),
          (r'^D\./L\.\s*', 'Leitor'), (r'^D\.\s*', 'Diácono'), (r'^L\.\s*', 'Leitor'),
          (r'^Comentarista:\s*', 'Comentarista'), (r'^Cantores e Todos:\s*', 'Cantores e Todos'),
          (r'^Cantores:\s*', 'Cantores'), (r'^Todos:\s*', 'Todos'), (r'^Sacerdote:\s*', 'Sacerdote')]


def paragrafos(arq):
    x = zipfile.ZipFile(arq).read('word/document.xml').decode()
    for p in re.findall(r'<w:p[ >](?:(?!<w:p[ >]).)*?</w:p>', x, re.S):
        runs = re.findall(r'<w:r[ >].*?</w:r>', p, re.S)
        t = ''.join(''.join(re.findall(r'<w:t[^>]*>([^<]*)|(<w:br/>)', r) and
                    [a or '\n' for a, b in re.findall(r'<w:t[^>]*>([^<]*)|(<w:br/>)', r)]) for r in runs).strip()
        if not t:
            continue
        cores = [c for r in runs if '<w:t' in r for c in re.findall(r'<w:color w:val="([0-9A-Fa-f]{6})"', r)]
        texto_runs = [r for r in runs if re.search(r'<w:t[^>]*>[^<]*\w', r)]
        vermelho = texto_runs and all(re.search(r'<w:color w:val="(?!000000)[0-9A-Fa-f]{6}"', r) for r in texto_runs)
        yield t, bool(vermelho), False


def ler(arq):
    ps = list(paragrafos(arq))
    titulo = ps[1][0].title() if len(ps) > 1 else 'Rito'
    linhas = []
    for i, (t, verm, ital) in enumerate(ps):
        if i == 0:
            continue                      # PARÓQUIA …
        if i == 1:
            continue                      # título (vai no cabeçalho)
        papel = None
        for rx, nome in PAPEIS:
            m = re.match(rx, t)
            if m:
                papel, t = nome, t[m.end():]
                break
        if papel:
            ult = linhas[-1] if linhas else None
            if ult and ult[0] == papel and papel == 'Sacerdote' and ult[1].strip() in ('Oremos.',):
                ult[1] += '\n' + t
            else:
                linhas.append([papel, t])
        elif verm or ital:
            linhas.append(['Orientação', t])
        else:
            # continuação (oração depois de «Oremos.», versos de hino)
            if linhas and linhas[-1][0] != 'Orientação':
                linhas[-1][1] += '\n' + t
            else:
                linhas.append(['Orientação', t])
    return {'tipo': 'roteiro', 'titulo': titulo, 'secoes': [{'titulo': titulo.upper(), 'linhas': linhas}]}


if __name__ == '__main__':
    print(json.dumps(ler(sys.argv[1]), ensure_ascii=False, indent=1))
