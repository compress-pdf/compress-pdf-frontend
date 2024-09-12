# Next.js Starter Template

The goal of this starter template is to provide a clean and efficient starting point for building scalable, multilingual applications with Tailwind CSS, Redux, and other modern tooling. This setup is production-ready and focuses on performance, ease of development, and adherence to best practices.


## ⚡️ Tech Stack

- **Next.js**: Server-side rendering and static site generation.
- **Typescript**: Type safety and better development experience.
- **Tailwind CSS**: Utility-first CSS framework with custom configuration for responsiveness and themes.
- **ESLint**: For maintaining code quality.
- **Prettier**: For consistent code formatting.
- **Husky**: Pre-commit hooks to enforce standards.
- **Redux**: State management with Redux Toolkit.
- **Next Intl**: Internationalization support for multiple languages.
- **Next Themes**: Dark and light mode support.
- **React Hook Form**: Form handling and validations.
- **Zod**: Schema validation, specifically integrated with React Hook Form.
- **CommitLint**: Ensures commit messages follow a defined convention.
- **Testing**: RTL (React Testing Library) and Jest for unit tests.
- **Autoprefixer**: Handles vendor prefixes for CSS.
- **Prettier Plugin TailwindCSS**: Sorts Tailwind CSS classes for better readability.
- **Lint Staged**: To run linting on staged files.

## Tooling

- **ESLint**: Extends next rules.
- **Prettier**: Enforces consistent code formatting..
- **Husky**: Manages Git hooks for pre-commit linting.
- **LintStaged**: Lint only staged files during commits.
- **CommitLint**: Enforces commit message standards.

### Configuration Files Reference

- **Commit Message Structure**: Modify `commitlint.config.js` to define rules for commit messages.
- **ESLint & Prettier**: Update `.eslintrc.json` for linting rules, and `.prettierrc.js` for Prettier formatting.
- **TypeScript Configuration**: Customize `tsconfig.json` to define TypeScript compiler options and path aliases.
- **Tailwind CSS**: Adjust `tailwind.config.ts` to configure Tailwind CSS breakpoints, fonts, and custom colors.
- **Testing**: Configure `jest.config.ts` for Jest testing.
- **Husky & Git Hooks**: Modify `.husky/pre-commit` to set up pre-commit hooks.
- **Lint-Staged**: Edit `lint-staged.config.js` to run tasks like linting on staged files.
- **Environment Variables**: Add or update variables in `.env` and `.env.local` for environment-specific settings.


## 🛠️ Available Scripts

- `npm run dev`: Starts the development server using Next.js.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run prettier`: Runs Prettier to format files (`json`, `ts`, `tsx`).
- `npm run format:check`: Checks the formatting using Prettier without applying changes.
- `npm run format:fix`: Formats the code using Prettier and applies changes.
- `npm run test`: Runs the test suite using Jest.
- `npm run test:watch`: Runs tests in watch mode using Jest.
- `npm run prepare`: Runs Husky for managing Git hooks.

Additional utility scripts:
- `npx npm-check`: To check for outdated or unused packages.

### Path Aliases

```json
"paths": {
  "@/*": ["./src/*"],
  "@assets/*": ["./src/assets/*"],
  "@components/*": ["./src/components/*"],
  "@common/*": ["./src/components/common/*"],
  "@pages/*": ["./src/components/pages/*"],
  "@types/*": ["./src/types/*"],
  "@libs/*": ["./src/libs/*"],
  "@styles/*": ["./src/styles/*"],
  "@utils/*": ["./src/utils/*"],
  "@locale/*": ["./src/locale/*"]
}



## 📂 Folder Structure

└── 📁compress-pdf-frontend
    └── 📁__tests__
        └── page.test.tsx
    └── 📁messages
        └── de.json
        └── en.json
    └── 📁providers
        └── redux.tsx
    └── 📁public
    └── 📁src
        └── 📁app
            └── 📁[locale]
                └── 📁about
                    └── page.tsx
                └── layout.tsx
                └── not-found.tsx
                └── page.tsx
            └── globals.css
        └── 📁assets
            └── 📁icons
                └── Hamburger.tsx
                └── MoonIcon.tsx
                └── SunIcon.tsx
            └── 📁images
        └── 📁components
            └── 📁common
                └── Footer.tsx
                └── Header.tsx
                └── Navbar.tsx
            └── 📁containers
                └── SectionContainer.tsx
            └── 📁core
                └── Hamburger.tsx
                └── LanguageSwitcher.tsx
                └── ThemeSwitcher.tsx
        └── 📁constants
        └── 📁i18n
            └── request.ts
            └── routing.ts
        └── 📁redux
            └── store.ts
        └── 📁types
            └── Layout.ts
            └── SectionContainer.ts
    └── .env
    └── .eslintrc.json
    └── .prettierrc.js
    └── commitlint.config.js
    └── jest.config.ts
    └── next.config.mjs
    └── package.json
    └── tailwind.config.ts
    └── tsconfig.json


# TODO: Core Components

 - [ ] Navbar Dropdown
 - [ ] Navbar Link
 - [ ] Language switcher
 - [ ] Theme switcher
 - [ ] FAQ Section
 - [ ] Button Upload files type (1)
 - [ ] Button Start Compressing (2) (similar to 1 in color; with animation)
 - [ ] Button with dropdown (download/download zip)
 - [ ] Button share/print/view (can be merged)
 - [ ] Range slider (two types -  just different in color and size) (typable value)
 - [ ] Label with info
 - [ ] Button group (two button)
 - [ ] Sort (a-z/min-max)
 - [ ] progressbar
 - [ ] Modal
 - [ ] Tooltip
 - [ ] Toast (success, warning, error)
 - [ ] Star rating

 # TODO: Block Components
 - [ ] Navbar
 - [ ] Footer
 - [ ] Browse file block
 - 

