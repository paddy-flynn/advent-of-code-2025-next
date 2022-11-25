# 🎄 Advent of Code 2025 🎅

> *Unwrap 12 days of coding puzzles this holiday season!* ⭐

## 🎁 Tech Stack

- 🚀 Framework: [Next.js](https://nextjs.org/)
- 🎯 State Management: [Jotai](https://jotai.org/)
- 🌐 Deployment: [Vercel](https://vercel.com/)
- ✨ FP-Linting: [eslint-plugin-fp](https://github.com/jfmengels/eslint-plugin-fp) & [eslint-plugin-ramda](https://github.com/ramda/eslint-plugin-ramda)
- 🎨 Styling: [Tailwind CSS](https://tailwindcss.com/)
- 🎪 Icons: [Heroicons](https://heroicons.com/) & [Lucide React](https://lucide.dev/)
- 🔤 Font: [VT323](https://fonts.google.com/specimen/VT323/tester?category=Monospace&preview.text=Advent%20of%20Code&preview.text_type=custom)
- ❄️ Particles: [tsParticles](https://particles.js.org/)

## 🎄 Project Structure

- 🎁 [`puzzles/`](puzzles) - This is where the puzzles are solved!
- 🎯 `lib/` - State management and "game" logic to schedule puzzle execution
- 🎨 `template/` - Template generator and template files for the CLI
- 📄 `pages/` - Next.js pages
- 🧩 `components/` - React components
- 💅 `styles/` - Tailwind CSS styles
- 🖼️ `public/` - Static assets (favicon, images, etc.)

## 🔔 Running Locally

This application requires [Node.js v18+](https://nodejs.org/en/download/) and [Yarn v1.22+](https://classic.yarnpkg.com/en/docs/install).

```bash
git clone https://github.com/paddy-flynn/advent-of-code-2025-next.git
cd advent-of-code-next
yarn install
yarn dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/) 🎉

## 🎅 Prepare New Solution

Generate a new puzzle boilerplate with the following command:

```bash
yarn new-day
```

Enter the day number and the puzzle title, and you're good to go! 🎁 Open the generated file in `puzzles/` and start coding. Insert your puzzle input in the `input.txt` file and adapt tests in the `solution.test.ts` file.

## 🧪 Testing

Run tests with:

```bash
yarn test        # Run all tests (Jest + Storybook)
yarn test:jest   # Run Jest tests only
yarn typecheck   # Run TypeScript type checking
yarn lint        # Run ESLint
```

## 🎄 Happy Coding!

May your code be bug-free and your solutions be optimal! 🌟✨