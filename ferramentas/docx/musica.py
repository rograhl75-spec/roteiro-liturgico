"""Símbolo de MÚSICA (nota + violão) nos roteiros e cartões de rito.

Regra: todo momento cantado recebe, ao fim da rubrica vermelha, o par de ícones
que a Pastoral da Música já usa (nota musical + violão), sempre do mesmo tamanho.
  python3 musica.py arquivo.docx [...]
"""
import re, sys, zipfile, shutil, os, tempfile

AQUI = os.path.dirname(os.path.abspath(__file__))
MIDIA = os.path.join(AQUI, 'icones-musica')       # nota.png, violao.png, fundo.jpeg

# Início do texto que indica momento cantado (cartões e 2ª coluna dos roteiros)
CANTADO = re.compile(r'(?i)^\s*[«“"]?(canto\b|canta-se|ato penitencial|'
    r'gl[óo]ria a deus nas alturas|salmo responsorial|aclama[çc][ãa]o ao evangelho|sequ[êe]ncia|'
    r'santo, santo|cordeiro de deus|am[ée]m\.? \(cantado\)|te deum|hino\b|noite feliz|'
    r'fundo musical|m[úu]sica de|tantum ergo|t[ãa]o sublime|pater noster|anima christi|'
    r'verbum panis|bendito seja deus para sempre|vinde,? crist[ãa]os)')
# Em qualquer posição (rubricas dos cartões: «… canta-se "Noite Feliz"…»)
CANTADO_MEIO = re.compile(r'(?i)(canta-se(?! ou diz)|fundo musical|a m[úu]sica (come[çc]a|inicia|toca)|durante (o|um breve) canto|canto durante)')

def _rels_e_tipos(z_in, files):
    rels = files['word/_rels/document.xml.rels'].decode()
    ids = {}
    for nome, alvo in (('nota', 'media/musica-nota.png'), ('violao', 'media/musica-violao.png'), ('fundo', 'media/musica-fundo.jpeg')):
        m = re.search(r'Id="(rId\d+)"[^>]*Target="%s"' % re.escape(alvo), rels)
        if m: ids[nome] = m.group(1); continue
        n = max(int(x) for x in re.findall(r'Id="rId(\d+)"', rels)) + 1
        rid = f'rId{n}'
        rels = rels.replace('</Relationships>', f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="{alvo}"/></Relationships>')
        files['word/' + alvo] = open(os.path.join(MIDIA, os.path.basename(alvo).replace('musica-', '')), 'rb').read()
        ids[nome] = rid
    files['word/_rels/document.xml.rels'] = rels.encode()
    ct = files['[Content_Types].xml'].decode()
    for ext, mime in (('png', 'image/png'), ('jpeg', 'image/jpeg')):
        if f'Extension="{ext}"' not in ct:
            ct = ct.replace('<Default ', f'<Default Extension="{ext}" ContentType="{mime}"/><Default ', 1)
    files['[Content_Types].xml'] = ct.encode()
    return ids

def _icone(rid, rid_fundo, cx, cy, docpr, sz):
    return (f'<w:r><w:rPr><w:noProof/><w:sz w:val="{sz}"/></w:rPr><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
        f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="19050" t="19050" r="19050" b="19050"/><wp:docPr id="{docpr}" name="musica{docpr}" descr="Música"/>'
        '<wp:cNvGraphicFramePr/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
        '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="musica"/><pic:cNvPicPr/></pic:nvPicPr>'
        f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:blipFill><a:blip r:embed="{rid_fundo}"/><a:tile tx="0" ty="0" sx="100000" sy="100000" flip="none" algn="tl"/></a:blipFill>'
        '<a:ln w="12700"><a:solidFill><a:srgbClr val="002060"/></a:solidFill></a:ln></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>')

def _par_icones(ids, docpr, escala):
    sp = '<w:r><w:t xml:space="preserve"> </w:t></w:r>'
    return (sp + _icone(ids['nota'], ids['fundo'], int(162003*escala), int(142309*escala), docpr, 22) +
            _icone(ids['violao'], ids['fundo'], int(186952*escala), int(146282*escala), docpr + 1, 22))

def marcar(arq, cartao=None):
    with zipfile.ZipFile(arq) as z:
        files = {n: z.read(n) for n in z.namelist()}
        ordem = z.namelist()
    x = files['word/document.xml'].decode()
    if 'xmlns:wp=' not in x[:3000]:
        x = x.replace('<w:document ', '<w:document xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ', 1)
    if 'xmlns:r=' not in x[:3000]:
        x = x.replace('<w:document ', '<w:document xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ', 1)
    cartao = os.path.basename(arq).upper().startswith('RITO') if cartao is None else cartao
    ids = None
    docpr = [max([int(i) for i in re.findall(r'<wp:docPr id="(\d+)"', x)] + [100]) + 1]
    n = [0]
    def adiciona(par):
        nonlocal ids
        if ids is None: ids = _rels_e_tipos(None, files)
        k = par.rfind('</w:p>')
        novo = par[:k] + _par_icones(ids, docpr[0], 1.35 if cartao else 1.0) + par[k:]
        docpr[0] += 2; n[0] += 1
        return novo
    txt = lambda s: ''.join(re.findall(r'<w:t[^>]*>([^<]*)', s))
    if cartao:
        def troca_p(m):
            p = m.group(0); t = txt(p)
            if '<w:drawing>' in p or not t.strip(): return p
            # só rubricas (vermelho) ou linhas do coro
            if (CANTADO.search(t) or CANTADO_MEIO.search(t)) and (re.search(r'w:color w:val="(?!000000|auto)[0-9A-Fa-f]{6}"', p) or re.match(r'(?i)cantores', t)):
                return adiciona(p)
            return p
        x = re.sub(r'<w:p[ >](?:(?!<w:p[ >]).)*?</w:p>', troca_p, x, flags=re.S)
    else:
        def troca_tr(m):
            tr = m.group(0)
            if '<w:drawing>' in tr: return tr
            cels = re.findall(r'<w:tc>.*?</w:tc>', tr, re.S)
            if len(cels) < 2: return tr
            t = txt(cels[1]).strip()
            if not CANTADO.search(t) or re.match(r'(?i)gl[óo]ria a v[óo]s', t): return tr
            p = re.search(r'<w:p[ >].*?</w:p>', cels[1], re.S).group(0)
            return tr.replace(p, adiciona(p), 1)
        x = re.sub(r'<w:tr[ >].*?</w:tr>', troca_tr, x, flags=re.S)
    files['word/document.xml'] = x.encode()
    tmp = arq + '.tmp'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as z:
        for nme in ordem + [k for k in files if k not in ordem]:
            z.writestr(nme, files[nme])
    shutil.move(tmp, arq)
    return n[0]

if __name__ == '__main__':
    for a in sys.argv[1:]:
        print(marcar(a), os.path.basename(a))
