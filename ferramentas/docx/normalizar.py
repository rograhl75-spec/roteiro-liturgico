"""Normaliza os roteiros: fonte única (Garamond), ✠ legível, «Oremos» destacado,
rubricas em vermelho, monição inicial organizada, coroa do Advento em ordem,
somente informações do dia."""
import sys, re, copy
src = open('/home/claude/site/tools/oe2_fds.py').read().split('for arq in args:')[0]
args = []; exec(src)
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.table import _Cell
FONTE = 'Garamond'; SIMBOLO = 'Segoe UI Symbol'

# ---------------- utilidades de runs ----------------
def set_fonte(rpr, nome):
    rf = rpr.find(qn('w:rFonts'))
    if rf is None:
        rf = OxmlElement('w:rFonts'); rpr.insert(0, rf)
    for a in list(rf.attrib):
        rf.attrib.pop(a)
    for k in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rf.set(qn(k), nome)
def rpr_de(r):
    rpr = r.find(qn('w:rPr'))
    if rpr is None:
        rpr = OxmlElement('w:rPr'); r.insert(0, rpr)
    return rpr
def texto_run(r):
    return ''.join(t.text or '' for t in r.findall(qn('w:t')))
def dividir_run(r, i):
    """Divide o run r (só texto) no caractere i; devolve (esq, dir)."""
    txt = texto_run(r)
    if i <= 0 or i >= len(txt): return None
    novo = copy.deepcopy(r)
    for t in r.findall(qn('w:t')): r.remove(t)
    for t in novo.findall(qn('w:t')): novo.remove(t)
    for br in novo.findall(qn('w:br')): novo.remove(br)
    t1 = OxmlElement('w:t'); t1.text = txt[:i]; t1.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve'); r.append(t1)
    t2 = OxmlElement('w:t'); t2.text = txt[i:]; t2.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve'); novo.append(t2)
    r.addnext(novo)
    return r, novo
def runs_par(p):
    return [r for r in p.findall(qn('w:r')) if r.findall(qn('w:t'))]
def corte(p, i):
    """Garante fronteira de run no caractere i do parágrafo p."""
    pos = 0
    for r in runs_par(p):
        n = len(texto_run(r))
        if pos < i < pos + n:
            dividir_run(r, i - pos); return
        pos += n
def runs_ate(p, i):
    corte(p, i); pos = 0; out = []
    for r in runs_par(p):
        if pos >= i: break
        out.append(r); pos += len(texto_run(r))
    return out
def vermelho(r):
    rpr = rpr_de(r)
    for tag in ('w:color', 'w:i', 'w:b'):
        for e in rpr.findall(qn(tag)): rpr.remove(e)
    c = OxmlElement('w:color'); c.set(qn('w:val'), 'C00000'); rpr.append(c)
    i = OxmlElement('w:i'); rpr.append(i)
def negrito(r, sim=True):
    rpr = rpr_de(r)
    for e in rpr.findall(qn('w:b')): rpr.remove(e)
    if sim:
        b = OxmlElement('w:b'); rpr.append(b)
def sem_enfase(r):
    rpr = rpr_de(r)
    for tag in ('w:b', 'w:i', 'w:bCs', 'w:iCs'):
        for e in rpr.findall(qn(tag)): rpr.remove(e)

TITULO = re.compile(r'^(Oração da Coleta|Oração sobre as Oferendas|Oração depois da Comunhão|Prefácio|Bênção Solene|Bênção solene)')
def rubricas_no_texto(doc):
    for t in doc.tables:
        for tr in t._tbl.tr_lst:
            if len(tr.tc_lst) < 2: continue
            for p in tr.tc_lst[-1].findall(qn('w:p')):
                txt = ''.join(texto_run(r) for r in runs_par(p))
                fim = 0
                if txt.startswith('('):
                    fim = txt.find(')') + 1
                elif TITULO.match(txt):
                    fim = txt.find('\n') if '\n' in txt else len(txt)
                if fim > 0:
                    for r in runs_ate(p, fim): vermelho(r)
def oremos(doc):
    for t in doc.tables:
        for tr in t._tbl.tr_lst:
            if len(tr.tc_lst) < 2: continue
            for p in tr.tc_lst[-1].findall(qn('w:p')):
                rs = runs_par(p); txt = ''.join(texto_run(r) for r in rs)
                if not txt.startswith('Oremos.'): continue
                if txt.strip() == 'Oremos.':
                    for r in rs: negrito(r)
                    continue
                novo = copy.deepcopy(p)
                p.addprevious(novo)
                nr = runs_par(novo)
                for r in nr[1:]: novo.remove(r)
                for tt in nr[0].findall(qn('w:t')): nr[0].remove(tt)
                tt = OxmlElement('w:t'); tt.text = 'Oremos.'; nr[0].append(tt); negrito(nr[0]); sem_cor(nr[0])
                corte(p, len('Oremos.'))
                rs = runs_par(p)
                p.remove(rs[0])
                rs = runs_par(p)
                if rs:
                    tt = rs[0].findall(qn('w:t'))[0]; tt.text = tt.text.lstrip()
def sem_cor(r):
    rpr = rpr_de(r)
    for e in rpr.findall(qn('w:color')): rpr.remove(e)
    for e in rpr.findall(qn('w:i')): rpr.remove(e)
def cruz(doc_el):
    for r in list(doc_el.iter(qn('w:r'))):
        txt = texto_run(r)
        if '✠' not in txt or not r.findall(qn('w:t')): continue
        partes = re.split('(✠)', txt)
        base = copy.deepcopy(r)
        for t in base.findall(qn('w:t')): base.remove(t)
        ant = r
        novos = []
        for parte in partes:
            if not parte: continue
            nr = copy.deepcopy(base)
            tt = OxmlElement('w:t'); tt.text = parte; tt.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve'); nr.append(tt)
            if parte == '✠':
                rpr = rpr_de(nr)
                for e in rpr.findall(qn('w:color')): rpr.remove(e)
                c = OxmlElement('w:color'); c.set(qn('w:val'), 'C00000'); rpr.append(c)
                negrito(nr)
                nr.set('cruz', '1')
            novos.append(nr)
        for nr in novos:
            ant.addnext(nr); ant = nr
        r.getparent().remove(r)
def fontes(doc):
    partes = [doc.element.body]
    for s in doc.sections:
        for hf in (s.header, s.footer, s.first_page_header, s.first_page_footer):
            try: partes.append(hf._element)
            except Exception: pass
    for el in partes:
        cruz(el)
        for r in el.iter(qn('w:r')):
            rpr = rpr_de(r)
            set_fonte(rpr, SIMBOLO if r.get('cruz') else FONTE)
            if r.get('cruz'): r.attrib.pop('cruz')
            for sz in rpr.findall(qn('w:sz')) + rpr.findall(qn('w:szCs')):
                v = int(sz.get(qn('w:val')))
                sz.set(qn('w:val'), str({24: 26, 20: 22, 16: 18, 22: 24}.get(v, v)))
    st = doc.styles.element
    for rf in st.iter(qn('w:rFonts')):
        for a in list(rf.attrib): rf.attrib.pop(a)
        for k in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'): rf.set(qn(k), FONTE)
    for st_ in doc.styles:
        try: st_.font.name = FONTE
        except Exception: pass

# ---------------- estrutura ----------------
def linhas_tab(doc):
    for t in doc.tables:
        for tr in list(t._tbl.tr_lst):
            yield t, tr
def achar_ou_none(doc, pred):
    try: return achar(doc, pred)
    except KeyError: return None, None
def monicao(doc, proto):
    t, tr = achar_ou_none(doc, lambda p, x: p == 'Comentarista' and x.strip().startswith('Louvado seja'))
    if tr is None: return
    ant = tr.getprevious()
    if ant is not None and ant.tag == qn('w:tr') and 'Antes do canto de entrada' in texto(ant, t): return
    escrever(cel(tr, 1, t), 'Louvado seja Nosso Senhor Jesus Cristo!')
    inserir_antes(tr, [('Orientação', 'Antes do canto de entrada, o comentarista saúda a assembleia:')], proto)
    inserir_depois(tr, [('Todos', 'Para sempre seja louvado.')], proto)
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith('SOMENTE PARA AS MISSAS COM TRANSMISSÃO'))
    if tr is not None:
        resto = texto(tr, t).strip().split('\n', 1)[1].strip()
        c = cel(tr, 1, t); escrever(c, resto)
        for p in c.paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            for r in p.runs: sem_enfase(r._r); sem_cor(r._r)
        inserir_antes(tr, [('Orientação', 'Somente nas Missas transmitidas, o comentarista apresenta as intenções:')], proto)
    t, tr = achar_ou_none(doc, lambda p, x: p == 'Comentarista' and x.strip().startswith(('"Irmãos', '“Irmãos')))
    if tr is not None:
        x = texto(tr, t).strip().strip('"“”').replace('…', '.').replace('cantando.', 'cantando.')
        x = re.sub(r'\s*\n\s*', ' ', x)
        c = cel(tr, 1, t); escrever(c, x)
        for p in c.paragraphs:
            for r in p.runs: sem_enfase(r._r)
        inserir_antes(tr, [('Orientação', 'Monição inicial:')], proto)
def oremos_coleta(doc, proto):
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith('O sacerdote diz «Oremos»'))
    if tr is not None:
        inserir_antes(tr, [('Sacerdote', 'Oremos.')], proto)
        escrever(cel(tr, len(tr.tc_lst) - 1, t), 'Todos rezam em silêncio por alguns instantes (IGMR 54).')
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith('Oração depois da Comunhão'))
    if tr is not None:
        ant = tr.getprevious()
        if ant is None or ant.tag != qn('w:tr') or texto(ant, t).strip() != 'Oremos.':
            inserir_antes(tr, [('Sacerdote', 'Oremos.')], proto)
def remover_txt(doc, inicio):
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith(inicio))
    if tr is not None: remover(tr); return True
    return False
def so_bencao_solene(doc):
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith('Bênção simples (quando não houver'))
    if tr is None: return
    s = tr.getnext(); a = s.getnext()
    for r in (tr, s, a): remover(r)
    t, o = achar_ou_none(doc, lambda p, x: x.strip().startswith('Bênção Solene') and 'substitui a bênção simples' in x)
    if o is not None:
        x = texto(o, t).strip()
        x = re.sub(r'\s*(\(opcional\)\s*)?–\s*se for usada, substitui a bênção simples abaixo:?', ':', x).replace(' (opcional)', '')
        x = x.replace('; indicada no formulário da solenidade)', ')')
        escrever(cel(o, len(o.tc_lst) - 1, t), x)

COROA = {
 1: dict(cor='verde', ord='primeira', antes=None, sobe=False),
 2: dict(cor='roxa', ord='segunda', antes='a primeira vela', sobe=False),
 3: dict(cor='rósea', ord='terceira', antes='a primeira e a segunda vela', sobe=True),
 4: dict(cor='branca', ord='quarta', antes='a primeira, a segunda e a terceira vela', sobe=True),
}
def coroa(doc, proto, n):
    t, ini = achar(doc, lambda p, x: x.strip().startswith('Coroa do Advento, logo após'))
    t2, fim = achar(doc, lambda p, x: x.strip().startswith('Irmãos e irmãs, reconheçamos'))
    rows = []; at = ini
    while at is not fim:
        rows.append(at); at = at.getnext()
    def txt_de(pred):
        for r in rows:
            if pred(papel(r, t), texto(r, t).strip()): return texto(r, t).strip()
        return None
    ben_coroa = txt_de(lambda p, x: p == 'Sacerdote' and 'esta Coroa' in x)
    com = txt_de(lambda p, x: p == 'Comentarista')
    vela = txt_de(lambda p, x: p == 'Sacerdote' and 'esta Coroa' not in x and 'estas velas' not in x)
    velas = txt_de(lambda p, x: p == 'Sacerdote' and 'estas velas' in x)
    c = COROA[n]
    novo = []
    if n == 1:
        novo += [('Orientação', 'BÊNÇÃO DA COROA DO ADVENTO. Depois da saudação, omitido o versículo «O nosso auxílio está no nome do Senhor», o sacerdote diz:'),
                 ('Sacerdote', ben_coroa), ('Todos', 'Amém.'),
                 ('Orientação', 'O sacerdote asperge a coroa com água benta, em silêncio ou durante um breve canto.')]
        novo += [('Orientação', 'ACENDIMENTO DA PRIMEIRA VELA. O comentarista faz a motivação:')]
    else:
        novo += [('Orientação', f'ACENDIMENTO DA {c["ord"].upper()} VELA ({c["antes"]} já acesa{"s" if "e a" in c["antes"] else ""} antes da Missa). Depois da saudação, o comentarista faz a motivação:')]
    novo += [('Comentarista', com)]
    if c['sobe']:
        novo += [('Orientação', f'Durante o canto, uma pessoa (leitores, preces, liturgia ou comunidade), de túnica {c["cor"]}, traz a {c["ord"]} vela acesa em procissão pelo corredor central, sobe ao presbitério e permanece junto do sacerdote.'),
                 ('Cantores', 'Canto durante a procissão da vela.'),
                 ('Orientação', 'O sacerdote diz:'), ('Sacerdote', vela), ('Todos', 'Amém.'),
                 ('Orientação', 'Terminada a oração, a vela é colocada na coroa.')]
    else:
        novo += [('Orientação', f'Durante o canto, uma pessoa (leitores, preces, liturgia ou comunidade), de túnica {c["cor"]}, traz a {c["ord"]} vela acesa em procissão pelo corredor central e a coloca na coroa.'),
                 ('Cantores', 'Canto durante a procissão da vela.'),
                 ('Orientação', 'Colocada a vela, o sacerdote diz:'), ('Sacerdote', vela), ('Todos', 'Amém.')]
    novo += [('Orientação', 'BÊNÇÃO DAS VELAS DAS FAMÍLIAS. Todos elevam as velas que trouxeram para a coroa do Advento de suas casas, e o sacerdote diz:'),
             ('Sacerdote', velas), ('Todos', 'Amém.'),
             ('Orientação', 'Segue-se o ato penitencial.')]
    assert all(x for _, x in novo), novo
    for r in rows: remover(r)
    inserir_antes(fim, novo, proto)

def advento_geral(doc, n):
    t, tr = achar_ou_none(doc, lambda p, x: x.strip().startswith('TEMPO DO ADVENTO – cor roxa'))
    if tr is None: return
    cor = '3º Domingo do Advento (Gaudete) – cor rósea (ou roxa).' if n == 3 else 'Tempo do Advento – cor roxa.'
    x = texto(tr, t).strip().replace('TEMPO DO ADVENTO – cor roxa; no 3º Domingo (Gaudete), cor rósea.', cor)
    if n == 3:
        x = x.replace('sem antecipar a alegria plena do Natal', 'sem antecipar a alegria plena do Natal; neste domingo da alegria, o altar pode ser ornado com flores')
    escrever(cel(tr, len(tr.tc_lst) - 1, t), x)

def processar(arq, n_advento=None):
    d = docx.Document(arq)
    proto = Proto2(d)
    monicao(d, proto)
    oremos_coleta(d, proto)
    remover_txt(d, 'Na Páscoa e em Pentecostes')
    so_bencao_solene(d)
    if n_advento:
        advento_geral(d, n_advento)
        coroa(d, proto, n_advento)
    for t, tr in linhas_tab(d):
        x = texto(tr, t)
        if 'Oração Eucarística II. incensação' in x:
            escrever(cel(tr, len(tr.tc_lst) - 1, t), x.replace('II. incensação', 'II. Incensação'))
    converter_orientacoes(d)
    rubricas_no_texto(d)
    oremos(d)
    estilizar(d)
    fontes(d)
    d.save(arq)
    print('ok', arq.split('/')[-1])

def so_fonte(arq):
    d = docx.Document(arq); oremos(d); fontes(d); d.save(arq); print('fonte', arq.split('/')[-1])

if __name__ == '__main__':
    modo = sys.argv[1]
    for a in sys.argv[2:]:
        if modo == 'roteiro': processar(a)
        elif modo.startswith('advento'): processar(a, int(modo[-1]))
        else: so_fonte(a)
