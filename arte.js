'use strict'

const intersection = require('array-intersection')
const rss = require('simple-rss')
const h = require('./helpers')

const feedURL = 'http://www.arte.tv/papi/tvguide-flow/feeds/videos/de.xml?type=ARTE_PLUS_SEVEN&player=true'

const push = (array, item) => {if(item) array.push(item)}
const isDocumentary = (item) => (intersection(['Dokumentarfilm', 'Dokumentation', 'Dokumentationsreihe'], item.categories).length > 0)

const parseItem = (item) => {
	return {
		title: item.title,
		description: item.description,
		date: item.date,
		link: item.link,
		image: item.image.url,
		tags: (item['media:keywords'] && item['media:keywords']['#']) ? item['media:keywords']['#'].split(',') : null,
		network: 'arte'
	}
}

const parseItems = (items) => {
	const result = []
	for(let item of h.cleanList(items)){
		if(isDocumentary(item)) push(result, parseItem(item))
	}
	return h.cleanList(result)
}

const main = () => rss(feedURL).then(parseItems, h.err)

module.exports = main