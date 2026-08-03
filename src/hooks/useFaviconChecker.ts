// useFaviconChecker
import { useState } from "react";

interface IconProbe {
  label: string;
  path: string;
  found: boolean;
}
interface SiteMeta {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  logo: string | null;
  publisher: string | null;
  themeColor: string | null;
}
interface CheckResult {
  domain: string;
  faviconUrl: string;
  meta: SiteMeta | null;
  metaError: string | null;
  icons: IconProbe[];
}

const ICON_PATHS = [
  { label: "favicon.ico", path: "/favicon.ico" },
  { label: "favicon.png", path: "/favicon.png" },
  { label: "favicon.svg", path: "/favicon.svg" },
  { label: "apple-touch-icon.png", path: "/apple-touch-icon.png" },
];

function probeImage(url: string, timeoutMs = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(false);
      }
    }, timeoutMs);
    img.onload = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(img.naturalWidth > 0 && img.naturalHeight > 0);
      }
    };
    img.onerror = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(false);
      }
    };
    img.src = url;
  });
}

export function useFaviconChecker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (domainInput: string) => {
    const cleanDomain = domainInput
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");
    if (!cleanDomain || !cleanDomain.includes(".")) {
      setError("Enter a valid domain, e.g. example.com");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const fullUrl = `https://${cleanDomain}`;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;

    const iconProbePromise = Promise.all(
      ICON_PATHS.map(async ({ label, path }) => ({
        label,
        path,
        found: await probeImage(`${fullUrl}${path}`),
      })),
    );

    const metaPromise = fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(fullUrl)}&palette=true`,
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== "success")
          throw new Error(json.message || "Could not read site metadata.");
        const d = json.data;
        const meta: SiteMeta = {
          title: d.title ?? null,
          description: d.description ?? null,
          ogImage: d.image?.url ?? null,
          logo: d.logo?.url ?? null,
          publisher: d.publisher ?? null,
          themeColor: d.palette?.[0] ?? null,
        };
        return { meta, metaError: null as string | null };
      })
      .catch((err: Error) => ({
        meta: null as SiteMeta | null,
        metaError:
          err.message || "Site did not respond or blocked the request.",
      }));

    try {
      const [icons, { meta, metaError }] = await Promise.all([
        iconProbePromise,
        metaPromise,
      ]);
      setResult({ domain: cleanDomain, faviconUrl, meta, metaError, icons });
    } catch {
      setError("Something went wrong while checking this site. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, handleCheck };
}
