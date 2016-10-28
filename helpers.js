'use strict'
const dom = require('cheerio')
const got = require('got')

const id = (i) => i
const err = (error) => {throw new Error(error)}
const removeDuplicates = (list) => Array.from(new Set(list))
const removeEmpty = (list) => {
	const newList = []
	for(let el of list){
		if(el) newList.push(el)
	}
	return newList
}
const cleanList = (list) => removeDuplicates(removeEmpty(list))

const parseMeta = (res) => {
	const $ = dom.load(res.body)
	const tags = $('meta[name=keywords]').attr('content')
	return {
		title: $('meta[property="og:title"]').attr('content'),
		tags: (tags && tags.length) ? ((tags.search(', ')>=0) ? tags.split(', ') : tags.split(',')) : null,
		description: $('meta[name=description]').attr('content'),
		image: $('meta[property="og:image"]').attr('content'),
		link: res.requestUrl
	}
}

const getMeta = (url) => {
	return got(url).then(parseMeta, (error) => Promise.resolve(null))
}

const getMetaList = (adapt) => (list) => {
	return Promise.all(list.map(getMeta)).then((results) => cleanList(results).map(adapt), err)
}

module.exports = {id, err, removeDuplicates, removeEmpty, cleanList, getMeta, getMetaList}