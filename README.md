# Sora reader frontend

Bootstraped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

App uses:

- [React](https://reactjs.org/)
- [Next.JS (SSR)](https://nextjs.org/)
- [React-redux](https://react-redux.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)

## Installation requirements

- node 16.x ([nvm installation]([google.om](https://github.com/nvm-sh/nvm#install--update-script)))

## Usage

Install dependencies

```bash
npm install
```

Create `.env` file

```bash
cp .env.example .env
```

### Scripts (npm run)

- `backend` - start backend server on [http://localhost:8888](http://localhost:8888) (requires `BACKEND_PATH`)
- `dev` - run next dev server on [http://localhost:3000](http://localhost:3000)
- `build` - build source (compile ts, jsx, start SSG)
- `start` - run production server (requires `npm run build`)
- `fix` - run `prettier-eslint` tool to format with prettier while respecting *.eslintrc.json*
- `check` - run eslint
- `heroku-postbuild` - script to run on heroku deploy, **don't use**

## Useful links

- [axios](https://axios-http.com/docs/intro)
- [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- [redux toolkit](https://redux-toolkit.js.org/)
