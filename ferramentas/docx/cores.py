"""Cores dos roteiros e preces — padrão econômico de impressão (igual aos roteiros do Diácono Rogério).

- sem fundos coloridos (retira todo sombreamento de células e parágrafos);
- texto em preto; rubricas continuam em vermelho;
- marca-texto AMARELO no texto do Comentarista e em todas as respostas
  de «Todos» (o comentarista também responde), inclusive no rótulo da linha;
  as rubricas vermelhas dentro dessas células não recebem amarelo.

  python3 cores.py ROTEIRO.docx PRECES.docx ...
"""
import re, sys, zipfile, shutil

VERMELHOS = ('FF0000', 'C00000', 'A01010')
AMARELO = re.compile(r'todos|coment|animador', re.I)
# elementos que, no esquema do Word, vêm DEPOIS de <w:highlight> dentro de <w:rPr>
DEPOIS = ('<w:u ', '<w:u/', '<w:effect', '<w:bdr', '<w:shd', '<w:fitText', '<w:vertAlign',
          '<w:rtl', '<w:cs', '<w:em ', '<w:lang', '<w:eastAsianLayout', '<w:specVanish', '<w:oMath')


def _t(s):
    return ''.join(re.findall(r'<w:t[^>]*>([^<]*)', s))


def _destacar_run(r):
    if '<w:t' not in r or 'w:highlight' in r:
        return r
    m = re.search(r'<w:rPr>(.*?)</w:rPr>', r, re.S)
    if m:
        rpr = m.group(1)
        cor = re.search(r'<w:color w:val="(\w+)"', rpr)
        if cor and cor.group(1).upper() in VERMELHOS:
            return r
        pos = min([rpr.find(e) for e in DEPOIS if e in rpr] or [len(rpr)])
        novo = rpr[:pos] + '<w:highlight w:val="yellow"/>' + rpr[pos:]
        return r[:m.start(1)] + novo + r[m.end(1):]
    return re.sub(r'(<w:r(?: [^>]*)?>)', r'\1<w:rPr><w:highlight w:val="yellow"/></w:rPr>', r, count=1)


def ajustar(xml):
    x = re.sub(r'<w:shd [^>]*/>', '', xml)                       # sem fundos
    x = re.sub(r'<w:color w:val="(1A365D|FFFFFF|002060)"/>', '<w:color w:val="000000"/>', x)

    def linha(m):
        tr = m.group(0)
        tcs = re.findall(r'<w:tc>.*?</w:tc>', tr, re.S)
        if len(tcs) < 2 or not AMARELO.search(_t(tcs[0])):
            return tr
        return re.sub(r'<w:r(?: [^>]*)?>.*?</w:r>', lambda r: _destacar_run(r.group(0)), tr, flags=re.S)

    return re.sub(r'<w:tr[ >].*?</w:tr>', linha, x, flags=re.S)


def processar(arq):
    with zipfile.ZipFile(arq) as z:
        files = {n: z.read(n) for n in z.namelist()}
    files['word/document.xml'] = ajustar(files['word/document.xml'].decode()).encode()
    with zipfile.ZipFile(arq + '.t', 'w', zipfile.ZIP_DEFLATED) as z:
        for n, b in files.items():
            z.writestr(n, b)
    shutil.move(arq + '.t', arq)


if __name__ == '__main__':
    for a in sys.argv[1:]:
        processar(a)
        print('cores ajustadas:', a.split('/')[-1][:60])
