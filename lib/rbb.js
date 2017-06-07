'use strict'

const rss = require('simple-rss')
const h = require('./helpers')

const feedURL = 'http://mediathek.rbb-online.de/tv?rss'

const push = (array, item) => {if(item) array.push(item)}
const isDocumentary = (item) => (item && item['rss:category'] && item['rss:category']['#'] === '5_Doku-Highlights_Kategorie')

const parseList = (items) => {
	const links = []
	for(let item of h.cleanList(items)){
		if(isDocumentary(item)) push(links, item.link)
	}
	return h.cleanList(links)
}
const getList = () => rss(feedURL).then(parseList)

const adaptResult = (result) => {
	result.network = 'rbb'
	result.title = result.title.substring(6, result.title.length)
	return result
}

const main = () => getList().then(h.getMetaList(adaptResult))

module.exports = main