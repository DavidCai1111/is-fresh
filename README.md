# is-fresh
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/DavidCai1993/is-fresh.svg?branch=master)](https://travis-ci.org/DavidCai1993/is-fresh)
[![Coverage Status](https://coveralls.io/repos/github/DavidCai1993/is-fresh/badge.svg?branch=master)](https://coveralls.io/github/DavidCai1993/is-fresh?branch=master)

Check whether cache can be used in this HTTP request.

## Install

```
npm install is-fresh
```

## API

```js
'use strict'
const isFresh = require('is-fresh')
```

isFresh(req, res)

  - req: an instance of `http.incomingMessage`
  - res: an instance of `http.ServerResponse`

Return `true` when cache can be used in this HTTP request, otherwise it will return `false`.
