import docx,re,sys,json,glob,os
LEI=re.compile(r'Lecion[aá]rio\s*([IV]+)',re.I)
def parse(f):
    d=docx.Document(f); out=[]
    for t in d.tables:
        rows=[[c.text.strip() for c in r.cells] for r in t.rows]
        if not rows: continue
        head=rows[0][0]
        for r in rows:
            u=list(dict.fromkeys(r))
            if len(u)>=4 and LEI.search(u[2] if len(u)>2 else ''):
                m=LEI.search(u[2]); pag=u[3].strip()
                if u[0].lower().startswith('salmo') and not re.match(r'\d',pag): continue
                out.append(dict(dia=head.split('\n')[0][:120],parte=u[0],ref=u[1],lec=m.group(1).upper(),pag=pag,arq=os.path.basename(f)))
    return out
if __name__=='__main__':
    allr=[]
    for f in sorted(glob.glob(sys.argv[1]+'/*.docx')): allr+=parse(f)
    json.dump(allr,open(sys.argv[2],'w'),ensure_ascii=False,indent=0)
    print(len(allr))
    for r in allr[:6]: print(r)
