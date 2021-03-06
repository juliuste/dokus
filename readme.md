# dokus

Fetch information about documentaries in the **[ARTE](http://www.arte.tv/guide/de/plus7/?country=DE)**, **[Das Erste](http://mediathek.daserste.de/)**, **[MDR](http://www.mdr.de/mediathek/)**, **[SRF](https://www.srf.ch/play/tv)**, **[SWR](http://swrmediathek.de)** and **[Deutsche Welle](http://www.dw.com/de/media-center/alle-inhalte/s-100814)** media libraries.

[![npm version](https://img.shields.io/npm/v/dokus.svg)](https://www.npmjs.com/package/dokus)
[![Build Status](https://travis-ci.org/juliuste/dokus.svg?branch=master)](https://travis-ci.org/juliuste/dokus)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/dokus.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/dokus.svg)](https://david-dm.org/juliuste/dokus)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/dokus.svg)](https://david-dm.org/juliuste/dokus#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/dokus.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Usage

The module has the following methods: `all`, `arte`, `daserste`, `mdr`, `srf`, `swr` and `dw`. Each method returns a `Promise` which resolves in a list of objects representing single documentaries:

```javascript
const dokus = require('dokus')

dokus.all().then(…)
```
will resolve in a list of objects which look like this:
```javascript
	{
		title: '…',
		description: '…',
		tags: […], // (not supported by all media libraries)
		link: '…', // media library url
		image: '…', // thumbnail
		network: 'arte'
	}
```

Please note that the script - especially `daserste` - may take a while to run.

## Similar Projects

- [doku-tagger](https://github.com/juliuste/doku-tagger/) - Try to assign country data to the fetched documentaries.
- [doku-karte](https://github.com/juliuste/doku-karte/) - "German documentaries sorted by country and displayed on a map."

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/dokus/issues).
