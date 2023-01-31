# Express-Vite Template

A template for building a web application using Express and Vite (React).

## Features

- Express for server-side rendering and API handling
- Vite for efficient and fast front-end development
- Ready to use with modern JavaScript syntax (ES2020)
- Hot Module Replacement (HMR) for both server and client
- Using esbuild for faster bundling and transpiling of JavaScript files
- All client dependencies are bundled using Vite
- Prettier for code formatting
- ESLint for linting
- Husky for pre-commit hooks
- lint-staged for linting staged files
- dotenv-flow for environment variables
- compression for compressing responses
- morgan for logging HTTP requests
- nodemon for development server

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/hussam-aldarwish/express-vite-template.git
```

2. Install dependencies

```bash
cd express-vite-template
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Visit http://localhost:3000 in your browser

## Production Build

To create a production build, run the following command:

```bash
npm run build
```

The production-ready files will be located in the `dist` directory.

## Credits

- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)

## Author

- [Hussam Aldarwish](https://github.com/hussam-aldarwish)

## License

This project is licensed under the MIT License.
