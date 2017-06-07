'use strict'

const got = require('got')
const h = require('./helpers')

const listURL = 'https://www.daserste.de/dasersteapp/index~categories_catVideo-reportageDokumentation_pageNumber-0'
const itemURL = (id) => 'https://www.daserste.de/dasersteapp/'+id+'~full.json'

const parseURL = (res) => {
	return listURL+'_pageSize-'+JSON.parse(res.body).resultCount+'.json'
}
const getURL = (url) => got(url).then(parseURL)

const extractImage = (list) => list.filter((e) => e.type==='varm').pop().url
const extractDescription = (list) => {
	let res = ''
	for(let item of list)
		if(item.text) res += item.text + ' '
	return res || null
}

const parseItem = (res) => {
	const data = JSON.parse(res.body)
	const item = {
		title: data.headline,
		description: extractDescription(data.copytext),
		link: data.weburl,
		image: extractImage(data.teaserImages[0].variantes),
		network: 'daserste'
	}
	return item
}
const getItem = (url) => got(url).then(parseItem).catch((err) => Promise.resolve(null))

const parseList = (res) => {
	const data = JSON.parse(res.body)
	const ids = []
	for(let e of data.entries){
		ids.push(itemURL(e.id))
	}
	return ids
}
const getList = (url) => got(url).then(parseList)

const map = (f) => (list) => Promise.all(list.map(f))

const main = () => getURL(listURL+'.json').then(getList).then(map(getItem)).then(h.cleanList)

module.exports = main