/**
 * 从 Figma 按 icons.json 中前缀为 icon- 或 tool- 的节点导出 SVG，保存到 assets/slices。
 * 将 fill/stroke 替换为 currentColor，便于用 CSS token 着色。
 *
 * 用法: node scripts/export-icon-svg.mjs  （需项目根 .env 中有 FIGMA_TOKEN）
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const loadEnv = async () => {
  const envPath = path.join(rootDir, ".env");
  try {
    const text = await fs.readFile(envPath, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {}
};

const FILE_KEY = "nyq9YWeE2nC9WoXXu2FfqD";
const ICONS_JSON = path.resolve(__dirname, "../resources/icons.json");
const OUTPUT_DIR = path.resolve(__dirname, "../assets/slices");

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function downloadFile(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Download failed ${res.status}: ${text}`);
  }
  return res.text();
}

/** 将 SVG 内 fill/stroke 改为 currentColor，便于用 token 着色；并统一为不透明以便 mask 正确显示规范色 */
function svgToTokenColor(svgString) {
  let s = svgString
    .replace(/\bfill="[^"]*"/g, 'fill="currentColor"')
    .replace(/\bstroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/\bfill='[^']*'/g, "fill='currentColor'")
    .replace(/\bstroke='[^']*'/g, "stroke='currentColor'");
  s = s.replace(/\sopacity="[^"]*"/g, ""); // 去掉 opacity，使 mask 全不透明，颜色由 token 控制
  s = s.replace(/\sopacity='[^']*'/g, "");
  s = s.replace(/<defs>[\s\S]*?<\/defs>/gi, ""); // 去掉未参与描边的渐变等，避免半透明
  return s;
}

async function main() {
  await loadEnv();
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error("Missing FIGMA_TOKEN. Set in .env or env.");
    process.exit(1);
  }

  const iconsJson = JSON.parse(await fs.readFile(ICONS_JSON, "utf8"));
  const iconSlices = (iconsJson.slices || []).filter(
    (s) => String(s.name).startsWith("icon-") || String(s.name).startsWith("tool-")
  );
  if (iconSlices.length === 0) {
    console.warn("No icon-* or tool-* slices in", ICONS_JSON);
    return;
  }

  const ids = iconSlices.map((s) => s.id);
  const idsParam = ids.join(",");
  const imagesUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=svg`;
  const imagesData = await fetchJson(imagesUrl, token);
  if (imagesData.err) {
    throw new Error(imagesData.err);
  }
  const imageUrls = imagesData.images || {};

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const slice of iconSlices) {
    const id = slice.id;
    const name = slice.name;
    const url = imageUrls[id] ?? imageUrls[id.replace(":", "-")];
    if (!url) {
      console.warn(`No SVG URL for ${id} (${name}), skipping.`);
      continue;
    }
    const rawSvg = await downloadFile(url);
    const tokenSvg = svgToTokenColor(rawSvg);
    const outPath = path.join(OUTPUT_DIR, `${name}.svg`);
    await fs.writeFile(outPath, tokenSvg, "utf8");
    console.log(`Saved ${name}.svg`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
