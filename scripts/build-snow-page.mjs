import { mkdir, readFile, writeFile } from "node:fs/promises";

// A real HTML entry lets shared links return 200 on GitHub Pages and gives
// link previews page-specific text before React loads.
const title = "Snow &amp; Backcountry | Matthew Howlett";
const description = "Matthew Howlett’s backcountry profile, AIARE 1 certification, and upcoming tour checklist and trip reports.";
const html = (await readFile(new URL("../dist/index.html", import.meta.url), "utf8"))
  .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
  .replace(/\s*<meta name="keywords"[^>]*>/, "");

const directory = new URL("../dist/snow/", import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL("index.html", directory), html);
