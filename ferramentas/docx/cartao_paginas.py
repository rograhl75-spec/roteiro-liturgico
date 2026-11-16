"""Quebras de página FIXAS nos cartões de rito (A5).

Alguns visualizadores (Google Drive/Docs, celulares) ignoram «manter linhas juntas»
e «manter com o próximo» e cortam uma oração no meio. Para não depender do
visualizador, este script calcula a paginação com folga (estimativa conservadora)
e põe «quebra de página antes» no início de cada bloco que não cabe inteiro,
levando junto a rubrica que o introduz (linhas terminadas em «:» e «Oremos.»)
e o ℟ que o conclui.

  python3 cartao_paginas.py RITO*.docx
"""
import re, sys, zipfile, shutil

FOLGA = 0.80          # usa só 80% da altura útil da página
CHAR = 0.47           # largura média de um caractere (em fração do corpo)
ENTRE = 1.42          # altura da linha (em fração do corpo), já com entrelinha 1,15


def _t(p):
    return ''.join(re.findall(r'<w:t[^>]*>([^<]*)', p))


def _altura(p, largura):
    t = _t(p)
    szs = [int(s) for s in re.findall(r'<w:sz w:val="(\d+)"', p)] or [22]
    corpo = max(szs) / 2
    por_linha = max(10, int(largura / (corpo * CHAR)))
    linhas = max(1, -(-len(t) // por_linha)) if t.strip() else 1
    m = re.search(r'<w:spacing [^>]*w:after="(\d+)"', p)
    depois = int(m.group(1)) / 20 if m else 10
    m = re.search(r'<w:spacing [^>]*w:before="(\d+)"', p)
    antes = int(m.group(1)) / 20 if m else 0
    if not t.strip():
        return min(corpo * ENTRE, 4) + depois
    return linhas * corpo * ENTRE + depois + antes


def _quebra(p):
    if 'w:pageBreakBefore' in p:
        return p
    if '<w:pPr>' in p:
        return p.replace('<w:pPr>', '<w:pPr><w:pageBreakBefore/>', 1)
    if re.search(r'<w:pPr\b', p):
        return re.sub(r'(<w:pPr\b[^>]*>)', r'\1<w:pageBreakBefore/>', p, count=1)
    return re.sub(r'(<w:p\b[^>]*>)', r'\1<w:pPr><w:pageBreakBefore/></w:pPr>', p, count=1)


def paginar(arq):
    with zipfile.ZipFile(arq) as z:
        files = {n: z.read(n) for n in z.namelist()}
    x = files['word/document.xml'].decode()
    sect = re.search(r'<w:pgSz w:w="(\d+)" w:h="(\d+)"/><w:pgMar w:top="(\d+)" w:right="(\d+)" w:bottom="(\d+)" w:left="(\d+)"', x)
    w, h, top, right, bot, left = (int(v) / 20 for v in sect.groups())
    largura, util = w - left - right, (h - top - bot) * FOLGA
    # remove quebras automáticas anteriores deste script (mantém as do autor marcadas de outro modo)
    x = x.replace('<w:pageBreakBefore/>', '')
    ms = list(re.finditer(r'<w:p[ >](?:(?!<w:p[ >]).)*?</w:p>', x, re.S))
    ps = [m.group(0) for m in ms]
    hs = [_altura(p, largura) for p in ps]
    txt = [_t(p).strip() for p in ps]
    # unidades: [início, fim] — parágrafo + ℟ seguintes; rubricas «…:» / «Oremos.» presas ao seguinte
    unidades, i = [], 0
    while i < len(ps):
        ini = i
        while i < len(ps) - 1 and (txt[i].endswith(':') or re.fullmatch(r'(S\.\s*)?Oremos\.?', txt[i]) or not txt[i]):
            i += 1
        j = i
        # a frase continua no parágrafo seguinte (hinos em versos): não separar antes do ponto final
        while j + 1 < len(ps) and txt[j] and not re.search(r'[.!?][»”"\)]?\s*$', txt[j]):
            j += 1
        while j + 1 < len(ps) and re.match(r'℟', txt[j + 1]):
            j += 1
        unidades.append((ini, j))
        i = j + 1
    usado, quebras = 0.0, []
    for k, (a, b) in enumerate(unidades):
        alt = sum(hs[a:b + 1])
        limite = util if alt > 40 else util / FOLGA * 0.95   # rubrica curta final cabe no resto da página
        if usado and usado + alt > limite:
            quebras.append(a)
            usado = 0.0
        usado += alt
    novos = list(ps)
    for a in quebras:
        novos[a] = _quebra(novos[a])
        # «manter com o próximo» antes de uma quebra fixa arrasta o bloco anterior
        # para a página seguinte em alguns visualizadores (Google): retirar
        if a > 0:
            novos[a - 1] = re.sub(r'<w:keepNext(?: w:val="[^"]*")?/>', '', novos[a - 1])
    out, pos = [], 0
    for m, n in zip(ms, novos):
        out.append(x[pos:m.start()]); out.append(n); pos = m.end()
    out.append(x[pos:])
    files['word/document.xml'] = ''.join(out).encode()
    with zipfile.ZipFile(arq + '.t', 'w', zipfile.ZIP_DEFLATED) as z:
        for n, b in files.items():
            z.writestr(n, b)
    shutil.move(arq + '.t', arq)
    return [txt[a][:45] for a in quebras]


if __name__ == '__main__':
    for a in sys.argv[1:]:
        print(a.split('/')[-1][:45], '→ quebras antes de:', paginar(a))
