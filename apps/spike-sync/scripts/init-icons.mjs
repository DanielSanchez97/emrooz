import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { deflateSync } from "node:zlib";

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makeSolidPng(width, height, r, g, b) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const rowBytes = width * 3 + 1;
  const raw = Buffer.alloc(rowBytes * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    raw[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const px = rowStart + 1 + x * 3;
      raw[px] = r;
      raw[px + 1] = g;
      raw[px + 2] = b;
    }
  }
  const compressed = deflateSync(raw);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const ICONS_DIR = "src-tauri/icons";
const SOURCE = "app-icon.png";

if (existsSync(join(ICONS_DIR, "icon.png"))) {
  console.log("[spike-sync] Icons already present, skipping.");
  process.exit(0);
}

mkdirSync(ICONS_DIR, { recursive: true });

writeFileSync(SOURCE, makeSolidPng(1024, 1024, 37, 99, 235));
console.log("[spike-sync] Wrote 1024x1024 placeholder app-icon.png.");

const result = spawnSync(
  "npx",
  ["@tauri-apps/cli", "icon", SOURCE],
  { stdio: "inherit", shell: process.platform === "win32" },
);

if (result.status === 0) {
  console.log(
    "[spike-sync] Icons generated. Swap in your own later by replacing app-icon.png and running `make ss-icons`.",
  );
} else {
  console.warn(
    "[spike-sync] `tauri icon` failed. Run `npx @tauri-apps/cli icon app-icon.png` manually.",
  );
  process.exit(1);
}
