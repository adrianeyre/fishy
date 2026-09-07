# Fishy Game

#### Technologies: TypeScript, React, SCSS, Vite

## Index

- [Installation and Run](#Install)
- [Scripts](#Scripts)
- [Screen Shots](#Shots)
- [Play Fishy](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required (`.nvmrc` pins it).

- To clone the repo and run the game

```shell
$ git clone https://github.com/adrianeyre/fishy
$ cd fishy
$ nvm use
$ npm install
$ npm start
```

The dev server listens on http://localhost:3000.

## <a name="Scripts">Scripts</a>

| Script                 | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm start`            | Vite dev server with hot reload                  |
| `npm run build`        | Typecheck, then build the site into `dist-web`   |
| `npm run serve`        | Serve the built site for a production smoke test |
| `npm test`             | Run the Vitest suite once                        |
| `npm run test:watch`   | Run the suite in watch mode                      |
| `npm run typecheck`    | `tsc --noEmit`                                   |
| `npm run lint`         | ESLint                                           |
| `npm run format:check` | Prettier, in check mode — what CI runs           |

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/fishy/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/fishy/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/fishy/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/fishy/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Play Fishy</a>

- [Fishy](https://adrianeyre.github.io/fishy/) — published to GitHub Pages by the release workflow on every push to `master`.
