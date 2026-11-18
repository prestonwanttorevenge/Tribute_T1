import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("D:/Networking/Tribute_T1/public/images/t1");
fs.mkdirSync(OUT_DIR, { recursive: true });

const USER_AGENT =
  "TributeT1Documentary/1.0 (https://github.com/tribute-t1-project; educational archival tribute)";

const TARGETS = [
  {
    out: "faker-2026.png",
    title: "File:T1_Faker_Lee_Sang-Hyeok_in_a_2026_Interview.png",
    fallbackQuery: "Faker 2026 Interview",
    thumbWidth: 1400,
  },
  {
    out: "faker-2025-worlds.jpg",
    title: "File:Faker_2025_Worlds_Final_Post-Game.jpg",
    fallbackQuery: "Faker 2025 Worlds",
    thumbWidth: 1600,
  },
  {
    out: "faker-2024-worlds.jpg",
    title: "File:Faker_at_Worlds_2024.jpg",
    fallbackQuery: "Faker Worlds 2024",
    thumbWidth: 1600,
  },
  {
    out: "t1-2024-stage.jpg",
    title: "File:T1_vs_Top_Esports_-_2024_Worlds_Quarterfinals.jpg",
    fallbackQuery: "T1 2024 Worlds",
    thumbWidth: 1600,
  },
  {
    out: "faker-2013.jpg",
    title: "File:Faker_(Lee_Sang-hyeok)_at_LoL_World_Championship_2013.jpg",
    fallbackQuery: "Faker 2013 World Championship",
    thumbWidth: 1400,
  },
  {
    out: "skt-2013-team.jpg",
    title: "File:SK_Telecom_T1_at_LoL_World_Championship_2013.jpg",
    fallbackQuery: "SK Telecom T1 2013",
    thumbWidth: 1600,
  },
  {
    out: "faker-2015.jpg",
    title: "File:Faker_at_2015_Worlds.jpeg",
    fallbackQuery: "Faker 2015 Worlds",
    thumbWidth: 1400,
  },
  {
    out: "skt-2015-trophy.jpg",
    title:
      "File:SK_Telecom_T1_with_2015_League_of_Legends_World_Champtionship_trophy.jpg",
    fallbackQuery: "SK Telecom T1 2015 trophy",
    thumbWidth: 1600,
  },
  {
    out: "zofgk-2022.jpg",
    title: "File:T1_win_2022_LCK_Spring_finals_(2)_(cropped).jpg",
    fallbackQuery: "T1 2022 LCK Spring finals",
    thumbWidth: 1600,
  },
  {
    out: "t1-2023-awards.jpg",
    title: "File:T1 players interview at 2023 LCK Awards - 02 (cropped).jpg",
    fallbackQuery: "T1 2023 LCK Awards",
    thumbWidth: 1600,
  },
  {
    out: "keria-2023.jpg",
    title: "File:Keria,_2023_worlds_winning_team_interview.jpg",
    fallbackQuery: "Keria 2023 worlds",
    thumbWidth: 1400,
  },
  {
    out: "gumayusi-2023.jpg",
    title: "File:Gumayusi_at_2023_LCK_Awards.jpg",
    fallbackQuery: "Gumayusi 2023",
    thumbWidth: 1400,
  },
  {
    out: "oner-worlds.jpg",
    title: "File:Oner_of_T1.jpg",
    fallbackQuery: "Oner T1",
    thumbWidth: 1400,
  },
  {
    out: "zeus-2024.jpg",
    title: "File:Zeus_2024_post-match_interview.jpg",
    fallbackQuery: "Zeus T1 interview",
    thumbWidth: 1400,
  },
  {
    out: "doran-lck.jpg",
    title: "File:Doran_at_2024_LCK_Summer.jpg",
    fallbackQuery: "Choi Hyeon-joon Doran",
    thumbWidth: 1400,
  },
  {
    out: "peyz-lck.jpg",
    title: "File:Peyz_at_MSI_2024.jpg",
    fallbackQuery: "Kim Su-hwan Peyz",
    thumbWidth: 1400,
  },
  {
    out: "t1-logo.svg",
    title: "File:T1_logo.svg",
    fallbackQuery: "T1 logo svg",
    raw: true,
  },
  {
    out: "renaissance-canvas.jpg",
    title: "File:Caravaggio_-_La_vocazione_di_san_Matteo.jpg",
    fallbackQuery: "Caravaggio Calling of Saint Matthew",
    thumbWidth: 1600,
  },
  {
    out: "renaissance-marble.jpg",
    title: "File:Michelangelo's_David_-_right_view_2.jpg",
    fallbackQuery: "Michelangelo Pieta OR David chiaroscuro",
    thumbWidth: 1400,
  },
];

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function resolveByTitle(title, thumbWidth, raw) {
  const widthParam = !raw && thumbWidth ? `&iiurlwidth=${thumbWidth}` : "";
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    title
  )}&prop=imageinfo&iiprop=url|mime|size${widthParam}&format=json`;
  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  const info = pages[0]?.imageinfo?.[0];
  if (!info) return null;
  return !raw && info.thumburl ? info.thumburl : info.url;
}

async function resolveBySearch(query, thumbWidth, raw) {
  const widthParam = !raw && thumbWidth ? `&iiurlwidth=${thumbWidth}` : "";
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=5&gsrsearch=${encodeURIComponent(
    query
  )}&prop=imageinfo&iiprop=url|mime|size${widthParam}&format=json`;
  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  for (const p of pages) {
    const info = p?.imageinfo?.[0];
    if (info && info.url) {
      return !raw && info.thumburl ? info.thumburl : info.url;
    }
  }
  return null;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) throw new Error(`Download HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 400) {
    throw new Error(`File too small (${buf.length} bytes) for ${url}`);
  }
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

async function main() {
  const results = [];
  for (const item of TARGETS) {
    const dest = path.join(OUT_DIR, item.out);
    try {
      let mediaUrl = await resolveByTitle(
        item.title,
        item.thumbWidth,
        item.raw
      );
      if (!mediaUrl && item.fallbackQuery) {
        mediaUrl = await resolveBySearch(
          item.fallbackQuery,
          item.thumbWidth,
          item.raw
        );
      }
      if (!mediaUrl) {
        results.push({ out: item.out, ok: false, reason: "No URL found" });
        continue;
      }
      const bytes = await downloadFile(mediaUrl, dest);
      results.push({ out: item.out, ok: true, bytes, mediaUrl });
      console.log(`OK   ${item.out.padEnd(26)} ${String(bytes).padStart(8)} bytes`);
    } catch (err) {
      results.push({ out: item.out, ok: false, reason: String(err.message) });
      console.log(`FAIL ${item.out.padEnd(26)} ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  const passed = results.filter((r) => r.ok).length;
  console.log(`\nSUMMARY: ${passed}/${results.length} files downloaded to ${OUT_DIR}`);
}

main();
