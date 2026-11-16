"""Fonte litúrgica (Garamond, como os livros litúrgicos) e tamanhos padronizados.

  python3 fontes.py <modo> ARQ.docx ...

Modos e tamanhos (Garamond tem letra menor que a Abadi: por isso +1 a +2 pt):
  roteiro   texto 13–14 pt, rubricas/rótulos 11–12 pt     (10→11, 11→12, 12→13, 13→14)
  preces    texto 15 pt, rubricas 13 pt                   (11/12→13, 13→14, 14→15)
  leituras  texto 14 pt
  escala    texto 11 pt                                    (10→11)
  antifona  texto 13 pt
  cartao    só a fonte (cartões do padre já em 16 pt; rubricas 14 pt)
  manter    só a fonte, tamanhos do original (ex.: Adoração Solene)
"""
import re, sys, zipfile, shutil

FONTE = 'Garamond'
SIMBOLOS = ('Segoe UI Symbol', 'Segoe UI Emoji', 'Cambria Math', 'Symbol', 'Wingdings')
MAPAS = {
    'roteiro': {10: 11, 11: 12, 12: 13, 13: 14},
    'preces': {11: 13, 12: 13, 13: 14, 14: 15},
    'escala': {10: 11},
}
PADRAO = {'leituras': 14, 'antifona': 13, 'escala': 11}


def _fontes(x):
    x = re.sub(r' w:(ascii|hAnsi|cs|eastAsia)Theme="[^"]*"', '', x)
    return re.sub(r'w:(ascii|hAnsi|cs|eastAsia)="([^"]*)"',
                  lambda m: m.group(0) if m.group(2) in SIMBOLOS else f'w:{m.group(1)}="{FONTE}"', x)


def _tamanhos(x, mapa):
    def tr(m):
        pt = int(m.group(2)) / 2
        novo = mapa.get(pt, mapa.get(int(pt)))
        return m.group(0) if novo is None else f'<w:{m.group(1)} w:val="{int(novo * 2)}"/>'
    return re.sub(r'<w:(sz|szCs) w:val="(\d+)"/>', tr, x)


def _padrao(styles, pt):
    """Fonte e tamanho no docDefaults (para textos sem formatação explícita)."""
    rf = f'<w:rFonts w:ascii="{FONTE}" w:hAnsi="{FONTE}" w:cs="{FONTE}" w:eastAsia="{FONTE}"/>'
    m = re.search(r'<w:rPrDefault>\s*<w:rPr>(.*?)</w:rPr>', styles, re.S)
    if not m:
        bloco = f'<w:docDefaults><w:rPrDefault><w:rPr>{rf}</w:rPr></w:rPrDefault></w:docDefaults>'
        if '<w:docDefaults>' in styles:
            styles = styles.replace('<w:docDefaults>', '<w:docDefaults><w:rPrDefault><w:rPr>' + rf + '</w:rPr></w:rPrDefault>', 1)
        else:
            styles = re.sub(r'(<w:styles\b[^>]*>)', r'\1' + bloco, styles, count=1)
        m = re.search(r'<w:rPrDefault>\s*<w:rPr>(.*?)</w:rPr>', styles, re.S)
    rpr = m.group(1)
    rpr = re.sub(r'<w:rFonts[^>]*/>', '', rpr)
    rpr = rf + rpr
    if pt:
        rpr = re.sub(r'<w:szCs? w:val="\d+"/>', '', rpr) + f'<w:sz w:val="{pt*2}"/><w:szCs w:val="{pt*2}"/>'
    styles = styles[:m.start(1)] + rpr + styles[m.end(1):]
    if pt:   # estilo Normal com tamanho próprio sobrepõe o padrão
        styles = re.sub(r'(<w:style w:type="paragraph" w:default="1"[^>]*>.*?</w:style>)',
                        lambda s: re.sub(r'<w:szCs? w:val="\d+"/>', '', s.group(1)), styles, count=1, flags=re.S)
    return styles


def processar(modo, arq):
    with zipfile.ZipFile(arq) as z:
        files = {n: z.read(n) for n in z.namelist()}
    mapa = MAPAS.get(modo, {})
    for n in list(files):
        if not re.match(r'word/(document|styles|header\d*|footer\d*|numbering|footnotes|endnotes)\.xml$', n):
            continue
        x = _fontes(files[n].decode())
        if n == 'word/styles.xml':
            x = _padrao(x, PADRAO.get(modo))
        if mapa and n != 'word/styles.xml':
            x = _tamanhos(x, mapa)
        files[n] = x.encode()
    with zipfile.ZipFile(arq + '.t', 'w', zipfile.ZIP_DEFLATED) as z:
        for n, b in files.items():
            z.writestr(n, b)
    shutil.move(arq + '.t', arq)


if __name__ == '__main__':
    modo, arqs = sys.argv[1], sys.argv[2:]
    for a in arqs:
        processar(modo, a)
        print(modo, '→', a.split('/')[-1][:60])
