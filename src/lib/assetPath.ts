const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix root-relative public asset paths with NEXT_PUBLIC_BASE_PATH for subpath deployments (e.g. GitHub Pages). */
export function assetPath(path: string): string {
  if (!path.startsWith("/") || !BASE_PATH) return path;
  return `${BASE_PATH}${path}`;
}
