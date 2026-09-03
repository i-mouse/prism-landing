# Prism Landing Page

Prism is an AI research-paper claim-auditing tool. This repo contains the marketing site for Prism, built with a modern 2026 tech stack: Next.js 15, Tailwind CSS v4, and Framer Motion 12.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to your [Vercel Dashboard](https://vercel.com/) and click "Add New... -> Project".
3. Import the repository.
4. Vercel will automatically detect the Next.js framework and configure the build settings.
5. Click "Deploy". Your site will be live in minutes.

## How to change theme colors

All custom colors are defined using OKLCH in `src/app/globals.css` via the Tailwind CSS v4 `@theme` block.

To update the primary brand color or verdict pill colors, modify these variables:
```css
@theme inline {
  --color-brand: var(--color-orange-500);
  --color-supported: var(--color-emerald-500);
  --color-partial: var(--color-amber-500);
  --color-refused: var(--color-rose-500);
  /* ... */
}
```

Dark mode specific colors can be updated in the `.dark` class block further down in the same file:
```css
.dark {
  --color-supported: var(--color-emerald-400);
  --color-partial: var(--color-amber-400);
  --color-refused: var(--color-rose-400);
  /* ... */
}
```

All content logic is centralized in `src/content.ts`. Update copy there instead of hunting through components.
