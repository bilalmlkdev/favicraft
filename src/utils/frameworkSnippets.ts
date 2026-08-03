// Framework snippets
export function getFrameworkSnippet(fw: string): string {
  switch (fw) {
    case "Next.js App Router":
      return `// app/layout.tsx\nexport const metadata = {\n  icons: {\n    icon: '/favicon.ico',\n    shortcut: '/favicon-16x16.png',\n    apple: '/apple-touch-icon.png',\n  },\n  manifest: '/site.webmanifest',\n};`;
    case "React / Vite":
      return `<!-- index.html -->\n<link rel="icon" type="image/x-icon" href="/favicon.ico" />\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n<link rel="manifest" href="/site.webmanifest" />`;
    case "Next.js Pages Router":
      return `// pages/_document.tsx\n<Head>\n  <link rel="icon" href="/favicon.ico" sizes="any" />\n  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n  <link rel="manifest" href="/site.webmanifest" />\n</Head>`;
    case "Astro":
      return `<!-- src/layouts/Layout.astro -->\n<link rel="icon" type="image/x-icon" href="/favicon.ico" />\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n<link rel="manifest" href="/site.webmanifest" />`;
    case "Nuxt":
      return `// nuxt.config.ts\nexport default defineNuxtConfig({\n  app: {\n    head: {\n      link: [\n        { rel: 'icon', href: '/favicon.ico' },\n        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }\n      ]\n    }\n  }\n})`;
    case "SvelteKit":
      return `<!-- src/app.html -->\n<link rel="icon" href="/favicon.ico" />\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n<link rel="manifest" href="/site.webmanifest" />`;
    case "WordPress":
      return `<!-- header.php -->\n<link rel="icon" href="<?php echo get_site_icon_url(); ?>" />`;
    default:
      return `<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="manifest" href="/site.webmanifest">`;
  }
}
