/* ==========================================================================
   Leitura mínima de arquivos do Office (DOCX e XLSX) e gravação de ZIP,
   sem dependências externas. Funciona no navegador e no Node.js.
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Office = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const textDecoder = new TextDecoder('utf-8');

  /* ---------------------------- Descompressão ---------------------------- */
  async function inflateRaw(bytes) {
    if (typeof process !== 'undefined' && process.versions && process.versions.node && typeof window === 'undefined') {
      return new Uint8Array(require('node:zlib').inflateRawSync(bytes));
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  /* ------------------------------- ZIP ---------------------------------- */
  async function readZip(input) {
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let eocd = -1;
    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Arquivo não é um documento do Office válido (ZIP).');
    const total = view.getUint16(eocd + 10, true);
    let offset = view.getUint32(eocd + 16, true);
    const files = new Map();
    for (let n = 0; n < total; n++) {
      if (view.getUint32(offset, true) !== 0x02014b50) throw new Error('ZIP corrompido.');
      const method = view.getUint16(offset + 10, true);
      const compressed = view.getUint32(offset + 20, true);
      const nameLength = view.getUint16(offset + 28, true);
      const extraLength = view.getUint16(offset + 30, true);
      const commentLength = view.getUint16(offset + 32, true);
      const local = view.getUint32(offset + 42, true);
      const name = textDecoder.decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
      const localName = view.getUint16(local + 26, true);
      const localExtra = view.getUint16(local + 28, true);
      const start = local + 30 + localName + localExtra;
      const data = bytes.subarray(start, start + compressed);
      files.set(name, { method, data });
      offset += 46 + nameLength + extraLength + commentLength;
    }
    return {
      names: [...files.keys()],
      has: (name) => files.has(name),
      async bytes(name) {
        const entry = files.get(name);
        if (!entry) return null;
        return entry.method === 0 ? entry.data : inflateRaw(entry.data);
      },
      async text(name) {
        const data = await this.bytes(name);
        return data ? textDecoder.decode(data) : null;
      }
    };
  }

  const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();
  function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  /* Gera um ZIP sem compressão (os documentos do Office já são comprimidos). */
  function writeZip(entries) {
    const encoder = new TextEncoder();
    const agora = new Date();
    const dosHora = (agora.getHours() << 11) | (agora.getMinutes() << 5) | (agora.getSeconds() >> 1);
    const dosData = ((agora.getFullYear() - 1980) << 9) | ((agora.getMonth() + 1) << 5) | agora.getDate();
    const parts = [];
    const central = [];
    let offset = 0;
    for (const { name, data } of entries) {
      const nameBytes = encoder.encode(name);
      const content = typeof data === 'string' ? encoder.encode(data) : data;
      const crc = crc32(content);
      const header = new DataView(new ArrayBuffer(30));
      header.setUint32(0, 0x04034b50, true);
      header.setUint16(4, 20, true);
      header.setUint16(6, 0x0800, true);
      header.setUint16(10, dosHora, true);
      header.setUint16(12, dosData, true);
      header.setUint32(14, crc, true);
      header.setUint32(18, content.length, true);
      header.setUint32(22, content.length, true);
      header.setUint16(26, nameBytes.length, true);
      parts.push(new Uint8Array(header.buffer), nameBytes, content);
      const record = new DataView(new ArrayBuffer(46));
      record.setUint32(0, 0x02014b50, true);
      record.setUint16(4, 20, true);
      record.setUint16(6, 20, true);
      record.setUint16(8, 0x0800, true);
      record.setUint16(12, dosHora, true);
      record.setUint16(14, dosData, true);
      record.setUint32(16, crc, true);
      record.setUint32(20, content.length, true);
      record.setUint32(24, content.length, true);
      record.setUint16(28, nameBytes.length, true);
      record.setUint32(42, offset, true);
      central.push(new Uint8Array(record.buffer), nameBytes);
      offset += 30 + nameBytes.length + content.length;
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, entries.length, true);
    end.setUint16(10, entries.length, true);
    end.setUint32(12, centralSize, true);
    end.setUint32(16, offset, true);
    const all = parts.concat(central, [new Uint8Array(end.buffer)]);
    const out = new Uint8Array(all.reduce((sum, part) => sum + part.length, 0));
    let position = 0;
    for (const part of all) { out.set(part, position); position += part.length; }
    return out;
  }

  /* ------------------------------- XML ----------------------------------- */
  const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
  const decodeEntities = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e] ?? m;
  });

  function parseXml(xml) {
    const rootNode = { name: '#root', attrs: {}, children: [] };
    const stack = [rootNode];
    const tag = /<(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>/g;
    let last = 0;
    let match;
    while ((match = tag.exec(xml))) {
      if (match.index > last) {
        const text = xml.slice(last, match.index);
        if (text) stack[stack.length - 1].children.push(decodeEntities(text));
      }
      last = tag.lastIndex;
      if (match[5] !== undefined) { stack[stack.length - 1].children.push(match[5]); continue; }
      if (!match[2]) continue;
      if (match[1]) { if (stack.length > 1) stack.pop(); continue; }
      const attrs = {};
      for (const [, key, , v1, v2] of match[3].matchAll(/([\w:.-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
        attrs[key] = decodeEntities(v1 ?? v2 ?? '');
      }
      const node = { name: match[2], attrs, children: [] };
      stack[stack.length - 1].children.push(node);
      if (!match[4]) stack.push(node);
    }
    return rootNode;
  }

  const elements = (node, name) => node.children.filter((c) => typeof c === 'object' && (!name || c.name === name));
  function findAll(node, name, out = []) {
    for (const child of node.children) {
      if (typeof child !== 'object') continue;
      if (child.name === name) out.push(child);
      findAll(child, name, out);
    }
    return out;
  }

  /* ------------------------------- DOCX ---------------------------------- */
  function paragraphText(p) {
    let text = '';
    (function walk(node) {
      for (const child of node.children) {
        if (typeof child !== 'object') continue;
        if (child.name === 'w:t' || child.name === 'w:delText' && false) text += child.children.filter((c) => typeof c === 'string').join('');
        else if (child.name === 'w:tab') text += ' ';
        else if (child.name === 'w:br' || child.name === 'w:cr') text += '\n';
        else if (child.name === 'w:del') continue;
        else walk(child);
      }
    }(p));
    return text;
  }

  function cellText(tc) {
    return elements(tc).flatMap((child) => child.name === 'w:p' ? [paragraphText(child)]
      : child.name === 'w:tbl' ? [tableRows(child).map((row) => row.join(' ')).join('\n')]
        : child.name === 'w:sdt' ? findAll(child, 'w:p').map(paragraphText) : []).join('\n');
  }

  function tableRows(tbl) {
    return elements(tbl, 'w:tr').map((tr) => {
      const cells = [];
      for (const tc of elements(tr, 'w:tc')) {
        const props = elements(tc, 'w:tcPr')[0];
        const vmerge = props && elements(props, 'w:vMerge')[0];
        const continued = vmerge && vmerge.attrs['w:val'] !== 'restart';
        cells.push(continued ? null : cellText(tc));
      }
      return cells;
    });
  }

  /* Devolve os blocos do corpo: { tipo: 'p', texto } ou { tipo: 'tabela', linhas: [[células]] } e o cabeçalho. */
  async function readDocx(input) {
    const zip = await readZip(input);
    const xml = await zip.text('word/document.xml');
    if (!xml) throw new Error('Documento do Word inválido.');
    const doc = parseXml(xml);
    const body = findAll(doc, 'w:body')[0];
    const blocks = [];
    (function walk(node) {
      for (const child of elements(node)) {
        if (child.name === 'w:p') blocks.push({ tipo: 'p', texto: paragraphText(child) });
        else if (child.name === 'w:tbl') blocks.push({ tipo: 'tabela', linhas: tableRows(child) });
        else if (child.name === 'w:sdt' || child.name === 'w:sdtContent') walk(child);
      }
    }(body));
    const headers = [];
    for (const name of zip.names.filter((n) => /^word\/header\d*\.xml$/.test(n)).sort()) {
      const header = parseXml(await zip.text(name));
      const text = findAll(header, 'w:p').map(paragraphText).join(' ').trim();
      if (text) headers.push(text);
    }
    return { blocos: blocks, cabecalho: headers.join(' ').replace(/\s+/g, ' ').trim() };
  }

  /* ------------------------------- XLSX ---------------------------------- */
  function columnIndex(ref) {
    const letters = ref.match(/^[A-Z]+/)[0];
    let n = 0;
    for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
    return n - 1;
  }

  async function readXlsx(input) {
    const zip = await readZip(input);
    const workbook = parseXml(await zip.text('xl/workbook.xml'));
    const rels = parseXml(await zip.text('xl/_rels/workbook.xml.rels'));
    const targets = Object.fromEntries(findAll(rels, 'Relationship').map((r) => [r.attrs.Id, r.attrs.Target]));
    const sharedXml = await zip.text('xl/sharedStrings.xml');
    const shared = sharedXml ? findAll(parseXml(sharedXml), 'si').map((si) =>
      findAll(si, 't').map((t) => t.children.filter((c) => typeof c === 'string').join('')).join('')) : [];
    const sheets = {};
    for (const sheet of findAll(workbook, 'sheet')) {
      let target = targets[sheet.attrs['r:id']];
      if (!target) continue;
      target = target.replace(/^\/?xl\//, '');
      const xml = await zip.text(`xl/${target}`);
      if (!xml) continue;
      const rows = [];
      for (const row of findAll(parseXml(xml), 'row')) {
        const index = Number(row.attrs.r) - 1;
        const values = [];
        for (const c of elements(row, 'c')) {
          const col = columnIndex(c.attrs.r);
          const v = elements(c, 'v')[0];
          const raw = v ? v.children.filter((x) => typeof x === 'string').join('') : null;
          let value = raw;
          if (c.attrs.t === 's') value = shared[Number(raw)];
          else if (c.attrs.t === 'inlineStr') value = findAll(c, 't').map((t) => t.children.join('')).join('');
          else if (c.attrs.t === 'b') value = raw === '1';
          else if (raw !== null && c.attrs.t !== 'str' && c.attrs.t !== 'e' && raw !== '' && !isNaN(raw)) value = Number(raw);
          values[col] = value;
        }
        rows[index] = values;
      }
      sheets[sheet.attrs.name] = rows;
    }
    return sheets;
  }

  /* Número de série do Excel → 'YYYY-MM-DD' */
  function excelDate(serial) {
    if (typeof serial !== 'number') return null;
    const ms = Math.round((serial - 25569) * 86400000);
    return new Date(ms).toISOString().slice(0, 10);
  }

  return { readZip, writeZip, readDocx, readXlsx, excelDate, parseXml, crc32 };
}));
