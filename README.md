
### Installation

Requires [Node.js](https://nodejs.org/) v11.13+ to run.

Make sure the Typescript compiler is installed

```sh
$ npm install -g typescript
$ tsc --version
```

Install the dependencies and devDependencies and start the server.

```sh
$ cd live-coding
$ npm install
$ npm start
```

## Available scripts

Build the app

```sh
$ npm run tsc
```

Execute the tests

```sh
$ npm run test
```

Execute the scraper (Data will be saved at `./db.json`)

```sh
$ npm run scrap
```

## License

MIT
