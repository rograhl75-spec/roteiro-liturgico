import sys, re, glob
src = open('/home/claude/site/tools/oe2_fds.py').read().split('for arq in args:')[0]
args = []; exec(src)
REP = [
 (r'SOMENTE NA MISSA DE DOMINGO ÀS 18h30 \(solenidade no fim de semana\): (\w)', lambda m: 'Na Missa de domingo às 18h30: ' + m.group(1)),
 (r'Oração Eucarística II \(regra da paróquia nos fins de semana\)\. Na Missa', 'Oração Eucarística II. Na Missa'),
 (r'Nas demais Missas, omitem-se as indicações marcadas com «SOMENTE NA MISSA DE DOMINGO ÀS 18h30»\.', 'Nas demais Missas, omitem-se as indicações marcadas «Na Missa de domingo às 18h30».'),
 (r'\s*\(dinâmica de 2025\)', ''), (r'Dinâmica de 2025: ', ''), (r'Como em 2025: ', ''), (r'Como em 2025, ', ''),
 (r' \(como em 2025\)', ''), (r' \(costume da paróquia, como em 2025\)', ' (costume da paróquia)'), (r', como em 2025', ''),
 (r'Hoje: coleta da Campanha para a Evangelização \(CNBB\) – lembrar na acolhida\. Cor rósea \(ou roxa\)\.', 'Hoje: coleta da Campanha para a Evangelização (CNBB) – lembrar nos avisos.'),
 (r'3º Domingo do Advento \(Gaudete\) – cor rósea \(ou roxa\)\. O altar é ornado com flores de modo moderado, e os instrumentos musicais acompanham o canto com moderação, sem antecipar a alegria plena do Natal \(IGMR 305 e 313\)\.',
  '3º Domingo do Advento (Gaudete) – cor rósea (ou roxa). Domingo da alegria: o altar pode ser ornado com flores e os instrumentos acompanham o canto com alegria, sem antecipar a plenitude do Natal (IGMR 305 e 313).'),
 (r'Amém\. \(cantado na Missa de domingo às 18h30\)', 'Amém. (cantado na Missa de domingo às 18h30)'),
]
for arq in sys.argv[1:]:
    d = docx.Document(arq); n = 0
    for t in d.tables:
        for tr in t._tbl.tr_lst:
            c = cel(tr, len(tr.tc_lst) - 1, t)
            for p in c.paragraphs:
                x = p.text; y = x
                for a, b in REP: y = re.sub(a, b, y)
                if y != x:
                    rs = p.runs
                    # substitui no conjunto de runs mantendo o 1º run (rubricas são uniformes)
                    rs[0].text = y
                    for r in rs[1:]: r._r.getparent().remove(r._r)
                    n += 1
    d.save(arq); print(n, arq.split('/')[-1])
