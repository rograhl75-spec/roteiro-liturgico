"""Paginação: sem páginas em branco e sem orações quebradas entre páginas."""
import sys, docx, copy, re
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
def pPr(p):
    x = p.find(qn('w:pPr'))
    if x is None: x = OxmlElement('w:pPr'); p.insert(0, x)
    return x
def flag(p, tag, on=True):
    x = pPr(p)
    for e in x.findall(qn(tag)): x.remove(e)
    if on: x.append(OxmlElement(tag))
def minusculo(p):
    """Parágrafo vazio de 1 pt, sem espaço antes/depois."""
    x = pPr(p)
    for tag in ('w:spacing',):
        for e in x.findall(qn(tag)): x.remove(e)
    sp = OxmlElement('w:spacing'); sp.set(qn('w:before'), '0'); sp.set(qn('w:after'), '0'); sp.set(qn('w:line'), '20'); sp.set(qn('w:lineRule'), 'exact'); x.append(sp)
    rpr = x.find(qn('w:rPr'))
    if rpr is None: rpr = OxmlElement('w:rPr'); x.append(rpr)
    for e in rpr.findall(qn('w:sz')): rpr.remove(e)
    s = OxmlElement('w:sz'); s.set(qn('w:val'), '2'); rpr.append(s)
    for r in p.findall(qn('w:r')):
        rr = r.find(qn('w:rPr'))
        if rr is None: rr = OxmlElement('w:rPr'); r.insert(0, rr)
        for e in rr.findall(qn('w:sz')): rr.remove(e)
        s = OxmlElement('w:sz'); s.set(qn('w:val'), '2'); rr.append(s)
def vazio(p):
    return not ''.join(p.itertext()).strip() and not p.findall('.//' + qn('w:drawing'))
def tem_quebra(p):
    return any(br.get(qn('w:type')) == 'page' for br in p.iter(qn('w:br')))
def processar(arq):
    d = docx.Document(arq)
    body = d.element.body
    # 1. linhas das tabelas não se partem entre páginas; rubricas ficam com a linha seguinte
    for tbl in body.iter(qn('w:tbl')):
        trs = tbl.findall(qn('w:tr'))
        for i, tr in enumerate(trs):
            trPr = tr.find(qn('w:trPr'))
            if trPr is None: trPr = OxmlElement('w:trPr'); tr.insert(0 if tr.find(qn('w:tblPrEx')) is None else 1, trPr)
            if trPr.find(qn('w:cantSplit')) is None: trPr.append(OxmlElement('w:cantSplit'))
            tcs = tr.findall(qn('w:tc'))
            unica = len(tcs) == 1
            # orientação (linha única) ou papel «Sacerdote | Oremos.» → manter com a próxima
            txt = ''.join(tr.itertext()).strip()
            titulo = txt.split('\n')[0] if False else txt
            if (unica or txt.endswith(':') or txt.endswith('Oremos.') or (txt.startswith(('Sacerdote', 'Diácono')) and re.search(r'(Prefácio|Oração da Coleta|Bênção Solene)[^\n]*\(pág\. \d+\)$', txt))) and i + 1 < len(trs):
                for p in tr.iter(qn('w:p')): flag(p, 'w:keepNext')
    # 2. quebras de página entre tabelas (preces): um parágrafo mínimo com «quebra antes»
    filhos = list(body)
    for i, el in enumerate(filhos):
        if el.tag != qn('w:p'): continue
        if tem_quebra(el) and vazio(el):
            for br in list(el.iter(qn('w:br'))):
                if br.get(qn('w:type')) == 'page': br.getparent().remove(br)
            flag(el, 'w:pageBreakBefore'); minusculo(el)
            ant = el.getprevious()
            if ant is not None and ant.tag == qn('w:p') and vazio(ant) and not tem_quebra(ant): body.remove(ant)
    # 2b. quebra de página sem tabela depois (sobra de horário removido) → apagar
    for el in list(body):
        if el.tag == qn('w:p') and el.find('.//' + qn('w:pageBreakBefore')) is not None:
            nxt = el.getnext()
            while nxt is not None and nxt.tag == qn('w:p') and vazio(nxt): nxt = nxt.getnext()
            if nxt is None or nxt.tag != qn('w:tbl'): body.remove(el)
    # 3. parágrafos vazios soltos: mínimos (evita «página extra»); títulos das partes ficam com a tabela
    for el in list(body):
        if el.tag != qn('w:p'): continue
        if vazio(el) and el.find('.//' + qn('w:pageBreakBefore')) is None: minusculo(el)
        elif not vazio(el): flag(el, 'w:keepNext')
    # 4. rodapé: só «página N» (o total de páginas pode aparecer desatualizado em alguns visualizadores)
    for sec in d.sections:
        for ft in (sec.footer, sec.first_page_footer, sec.even_page_footer):
            try: el = ft._element
            except Exception: continue
            for fs in list(el.iter(qn('w:fldSimple'))):
                if 'NUMPAGES' in (fs.get(qn('w:instr')) or ''):
                    ant = fs.getprevious()
                    if ant is not None and ant.tag == qn('w:r') and ''.join(ant.itertext()).strip() == 'de': ant.getparent().remove(ant)
                    fs.getparent().remove(fs)
            # «de» que sobrou no fim da linha (sem o total de páginas depois)
            for r in list(el.iter(qn('w:r'))):
                if ''.join(t.text or '' for t in r.iter(qn('w:t'))).strip() == 'de' and r.getnext() is None:
                    r.getparent().remove(r)
    # 5. preces: entrelinha 1,15 para cada horário caber numa página
    if '/PRECES' in arq or arq.split('/')[-1].startswith('PRECES'):
        for t in d.tables:
            for r in t.rows:
                for c in r.cells:
                    for p in c.paragraphs: p.paragraph_format.line_spacing = 1.15
    d.save(arq)
def cartao(arq):
    """Cartões de ritos (A5): rubrica fica com o que segue; a oração fica inteira com o seu ℟;
    nenhum parágrafo se parte entre páginas."""
    d = docx.Document(arq)
    ps = [p for p in d.paragraphs if p.text.strip()]
    def tipo(p):
        t = p.text.strip()
        if t.startswith('℟'): return 'resp'
        r0 = p.runs[0] if p.runs else None
        if r0 is not None and r0.font.italic: return 'rubrica'
        if r0 is not None and r0.font.bold and r0.font.color is not None and r0.font.color.rgb is not None and len(r0.text.strip()) <= 14 and r0.text.strip().endswith(('.', ':')):
            return 'fala'   # começa com o papel (S., D./L., Comentarista:)
        return 'cont'       # continuação da fala anterior
    inicio = next((i for i, p in enumerate(ps) if p.text.strip().startswith('Momento')), -1)
    for i, p in enumerate(ps):
        flag(p._p, 'w:keepLines')
        if i <= inicio or i == len(ps) - 1: flag(p._p, 'w:keepNext', False); continue
        t, prox = tipo(p), tipo(ps[i + 1])
        manter = t == 'rubrica' or p.text.strip().endswith('Oremos.') or prox in ('cont', 'resp')
        flag(p._p, 'w:keepNext', manter)
    d.save(arq)
def rodape(arq):
    """Só corrige o rodapé («página N», sem «de» sobrando)."""
    d = docx.Document(arq); mudou = False
    for sec in d.sections:
        for ft in (sec.footer, sec.first_page_footer, sec.even_page_footer):
            try: el = ft._element
            except Exception: continue
            for r in list(el.iter(qn('w:r'))):
                if ''.join(t.text or '' for t in r.iter(qn('w:t'))).strip() == 'de' and r.getnext() is None:
                    r.getparent().remove(r); mudou = True
    if mudou: d.save(arq)
    return mudou

if __name__ == '__main__':
    modo = sys.argv[1]
    for a in sys.argv[2:]:
        {'cartao': cartao, 'rodape': rodape}.get(modo, processar)(a); print('ok', a.split('/')[-1])
