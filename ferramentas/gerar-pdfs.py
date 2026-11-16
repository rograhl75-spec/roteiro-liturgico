"""Gera o PDF fiel de cada documento da página (roteiros, preces, cartões de rito)
a partir do próprio .docx (LibreOffice + fonte EB Garamond), em semanas/<id>/pdf/.
A página mostra, imprime e envia esse PDF — igual ao arquivo original.
  python3 ferramentas/gerar-pdfs.py [semanas/2026-11-16 ...]   (sem argumentos: todas)
Requer: soffice e a fonte EB Garamond instalada como «Garamond» (ver docs/APROVACAO.md).
"""
import glob, hashlib, json, os, shutil, subprocess, sys, tempfile

raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
pastas = sys.argv[1:] or sorted(glob.glob(os.path.join(raiz, 'semanas', '*')))
for pasta in pastas:
    arq = os.path.join(pasta, 'semana.json')
    if not os.path.exists(arq):
        continue
    s = json.load(open(arq))
    mudou = False
    for chave, r in s.get('roteiros', {}).items():
        fonte = r.get('fonte')
        if not fonte or not fonte.lower().endswith('.docx'):
            continue
        docx = os.path.join(raiz, fonte)
        if not os.path.exists(docx):
            continue
        h = hashlib.sha256(open(docx, 'rb').read()).hexdigest()[:16]
        nome = os.path.splitext(os.path.basename(fonte))[0] + '.pdf'
        rel = f"{os.path.dirname(fonte)}/pdf/{nome}"
        destino = os.path.join(raiz, rel)
        if r.get('pdf') == rel and r.get('pdfHash') == h and os.path.exists(destino):
            continue
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        with tempfile.TemporaryDirectory() as tmp:
            shutil.copy(docx, os.path.join(tmp, 'doc.docx'))
            subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', tmp, os.path.join(tmp, 'doc.docx')],
                           check=True, capture_output=True)
            shutil.move(os.path.join(tmp, 'doc.pdf'), destino)
        r['pdf'], r['pdfHash'] = rel, h
        mudou = True
        print('PDF', rel)
    if mudou:
        open(arq, 'w').write(json.dumps(s, ensure_ascii=False, indent=1) + '\n')
