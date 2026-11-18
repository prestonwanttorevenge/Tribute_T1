import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("D:/Networking/Tribute_T1/public/images/t1");
fs.mkdirSync(OUT_DIR, { recursive: true });

const USER_AGENT =
  "TributeT1Documentary/1.0 (https://github.com/tribute-t1-project; educational archival tribute)";

const TARGETS = [
  {
    out: "boxer-founder.jpg",
    titles: ["File:Boxer fighting!.jpg", "File:Boxer in 2021.jpg"],
    fallbackQuery: "Lim Yo-hwan BoxeR",
    thumbWidth: 1400,
  },
  {
    out: "kkoma-2015.jpg",
    titles: [
      "File:KkOma at 2015 League of Legends World Championship.jpg",
      "File:Kkoma at 2015 Worlds.jpeg",
    ],
    fallbackQuery: "kkOma 2015 Worlds",
    thumbWidth: 1400,
  },
  {
    out: "bengi-legend.jpg",
    titles: ["File:Bengi 2017 interview.jpg"],
    fallbackQuery: "Bengi League of Legends",
    thumbWidth: 1400,
  },
  {
    out: "birds-nest-2017.jpg",
    titles: [
      "File:Beijing_national_stadium.jpg",
      "File:Beijing National Stadium 1.jpg",
    ],
    fallbackQuery: "Beijing National Stadium",
    thumbWidth: 1600,
  },
  {
    out: "oner-solo.jpg",
    titles: ["File:Oner in 2024.jpg"],
    fallbackQuery: "Oner Mun Hyeon-jun",
    thumbWidth: 1200,
  },
  {
    out: "oner-2025.jpg",
    titles: ["File:Oner at Worlds 2025.jpg"],
    fallbackQuery: "Oner Worlds 2025",
    thumbWidth: 1400,
  },
  {
    out: "gumayusi-mvp.jpg",
    titles: [
      "File:Gumayusi, 2023 worlds winning team interview.jpg",
      "File:Gumayusi in 2021 interview.jpg",
    ],
    fallbackQuery: "Gumayusi interview",
    thumbWidth: 1400,
  },
  {
    out: "t1-worlds-2024-team.jpg",
    titles: ["File:T1 at Worlds 2024.jpg"],
    fallbackQuery: "T1 Worlds 2024",
    thumbWidth: 1600,
  },
  {
    out: "t1-dofgk-2025.jpg",
    titles: [
      "File:T1 at LCK 2025 Road to MSI - 1.jpg",
      "File:T1 at LCK 2025 Road to MSI - 2.jpg",
    ],
    fallbackQuery: "T1 LCK 2025",
    thumbWidth: 1600,
  },
];

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function resolveByTitle(title, thumbWidth) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    title
  )}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=${thumbWidth}&format=json`;
  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  const info = pages[0]?.imageinfo?.[0];
  if (!info) return null;
  return info.thumburl || info.url;
}

async function resolveBySearch(query, thumbWidth) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=5&gsrsearch=${encodeURIComponent(
    query
  )}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=${thumbWidth}&format=json`;
  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  for (const p of pages) {
    const info = p?.imageinfo?.[0];
    if (info && info.url) return info.thumburl || info.url;
  }
  return null;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error(`Too small (${buf.length} bytes)`);
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

async function main() {
  for (const item of TARGETS) {
    const dest = path.join(OUT_DIR, item.out);
    let mediaUrl = null;
    for (const t of item.titles) {
      mediaUrl = await resolveByTitle(t, item.thumbWidth);
      if (mediaUrl) break;
    }
    if (!mediaUrl) {
      mediaUrl = await resolveBySearch(item.fallbackQuery, item.thumbWidth);
    }
    if (!mediaUrl) {
      console.log(`FAIL ${item.out}: not found`);
      continue;
    }
    const bytes = await downloadFile(mediaUrl, dest);
    console.log(`OK   ${item.out.padEnd(26)} ${String(bytes).padStart(8)} bytes  <- ${mediaUrl.slice(0, 75)}`);
    await new Promise((r) => setTimeout(r, 250));
  }
}

main();
