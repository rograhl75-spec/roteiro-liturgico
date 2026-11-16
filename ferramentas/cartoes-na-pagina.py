"""Transforma os botões de link dos cartões de rito (RITO - ….docx) em documentos da página
(abrem na tela, imprimem e enviam PDF como o roteiro). Idempotente.
  python3 ferramentas/cartoes-na-pagina.py semanas/2026-11-23 [...]
"""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'docx'))
import cartao_json

raiz = os.path.join(os.path.dirname(__file__), '..')
for pasta in sys.argv[1:]:
    arq = os.path.join(pasta, 'semana.json')
    s = json.load(open(arq))
    n = s['legacyWeek']
    extras = s.setdefault('roteiroExtras', [])
    k = 0
    cartoes = s['dias'] + ([s['fimDeSemana']] if s.get('fimDeSemana') else [])
    for c in cartoes:
        for b in c.get('botoes', []):
            arquivo = b.get('arquivo') or ''
            if not os.path.basename(arquivo).startswith('RITO'):
                if b.get('tipo') == 'roteiro' and b.get('chave', '').startswith('rito'):
                    k += 1
                continue
            k += 1
            chave = 'rito' if k == 1 else f'rito{k}'
            rotulo = re.sub(r'\s*\(impressão\)\s*$', '', b['rotulo']).replace('📄', '🕯️').strip()
            doc = cartao_json.ler(os.path.join(raiz, arquivo))
            doc['titulo'] = re.sub(r'^\W+\s*', '', rotulo)
            doc['secoes'][0]['titulo'] = doc['titulo'].upper()
            doc['fonte'] = arquivo
            doc['cartao'] = True
            doc['botao'] = rotulo
            s['roteiros'][f'roteiro_{n}_{chave}'] = doc
            if chave not in extras:
                extras.append(chave)
            b.clear(); b.update({'tipo': 'roteiro', 'chave': chave, 'rotulo': rotulo})
            print(pasta, '→', chave, rotulo)
    open(arq, 'w').write(json.dumps(s, ensure_ascii=False, indent=1) + '\n')
