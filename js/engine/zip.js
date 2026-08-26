/* ============================================================
   ZIP — minimal client-side ZIP writer (store, no compression).
   Enough for text-based field labs; zero dependencies.
   zipFiles([{name, data}]) → Blob ready for download.
   ============================================================ */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for(let n = 0; n < 256; n++){
    let c = n;
    for(let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes){
  let c = 0xFFFFFFFF;
  for(let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function dosTime(d){
  const time = ((d.getHours() & 31) << 11) | ((d.getMinutes() & 63) << 5) | ((d.getSeconds() / 2) & 31);
  const date = (((d.getFullYear() - 1980) & 127) << 9) | (((d.getMonth() + 1) & 15) << 5) | (d.getDate() & 31);
  return { time, date };
}

export function zipFiles(entries){
  const enc = new TextEncoder();
  const now = dosTime(new Date());
  const locals = [], centrals = [];
  let offset = 0;

  for(const { name, data } of entries){
    const nameB = enc.encode(name);
    const dataB = enc.encode(data);
    const crc = crc32(dataB);

    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);   // local header signature
    lh.setUint16(4, 20, true);           // version needed
    lh.setUint16(6, 0x0800, true);       // UTF-8 names
    lh.setUint16(8, 0, true);            // method: store
    lh.setUint16(10, now.time, true);
    lh.setUint16(12, now.date, true);
    lh.setUint32(14, crc, true);
    lh.setUint32(18, dataB.length, true);
    lh.setUint32(22, dataB.length, true);
    lh.setUint16(26, nameB.length, true);
    lh.setUint16(28, 0, true);
    locals.push(new Uint8Array(lh.buffer), nameB, dataB);

    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);   // central signature
    ch.setUint16(4, 20, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint16(10, 0, true);
    ch.setUint16(12, now.time, true);
    ch.setUint16(14, now.date, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, dataB.length, true);
    ch.setUint32(24, dataB.length, true);
    ch.setUint16(28, nameB.length, true);
    ch.setUint32(42, offset, true);
    centrals.push(new Uint8Array(ch.buffer), nameB);

    offset += 30 + nameB.length + dataB.length;
  }

  const centralSize = centrals.reduce((a, b) => a + b.length, 0);
  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true);
  eocd.setUint16(8, entries.length, true);
  eocd.setUint16(10, entries.length, true);
  eocd.setUint32(12, centralSize, true);
  eocd.setUint32(16, offset, true);

  return new Blob([...locals, ...centrals, new Uint8Array(eocd.buffer)], { type: "application/zip" });
}

export function downloadZip(folderName, files){
  const entries = Object.entries(files).map(([name, data]) => ({ name: `${folderName}/${name}`, data }));
  const url = URL.createObjectURL(zipFiles(entries));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${folderName}.zip`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
