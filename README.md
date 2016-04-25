# react-opinionated-static-boilerplate

> A Static website built with ReactJS.


> Write your thoughts in Markdown, and let this boilerplate do the rest !

## Demo
[https://cusx.io](https://cusx.io) 🔥

## Contains

- [x] Babel 6
- [x] React 15
- [x] React-router 2
- [x] Redux 3
- [x] Koa 2
- [x] Autoprefixer
- [x] Sass
- [x] [GitHub Generated Markdown](https://developer.github.com/v3/markdown/)
- [x] S3 Deploy Script

## Setup

```bash
$ npm install
```

## Usage

```bash
## For Development
$ npm run start

## For build Production build
$ npm run build
```

## How does it work?

**Step 1**

Markdown files in the [`_droplets`](https://github.com/cusxio/react-opinionated-static-boilerplate/tree/master/_droplets) folder contains **metadata** that will be used to generate the static files.

For example:

```yaml
---
title: Hello World !
description: Hello from the inside :)
tags: [Development]
layout: Post
route: /blog/hello-world/
---
```

**Step 2**

The [`json-markdown`](https://github.com/cusxio/react-opinionated-static-boilerplate/blob/master/script/json-markdown.js#L43-L69) script is then used to generate a JSON file that contains all the markdown that is converted into HTML. The JSON file will be saved to `_tmp/data.json`.

**Step 3**

Webpack then loads the `data.json` file from the `tmp` folder. And populates the entire React app with HTML generated from markdown !

**Misc.**

Static files are generated using the [`build`](https://github.com/cusxio/react-opinionated-static-boilerplate/blob/master/script/build) and [`generator`](https://github.com/cusxio/react-opinionated-static-boilerplate/blob/master/script/generator.js) script. The final production ready file will then be located in the `dist` folder.

## Deploy

```bash
$ ./script/deploy AWS_S3_BUCKET=BUCKET_NAME
```

Enjoy 🔥

## License

MIT © Jonathan Chan
