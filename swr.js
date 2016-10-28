'use strict'

const got = require('got')
const h = require('./helpers')

const baseURL = 'http://swrmediathek.de/'
const listURL = 'http://swrmediathek.de/content/doku.htm'

const parseList = (res) => {
	let html = res.body.replace(/\s/g, "")
	const re = /player.htm\?show=([^"]+)"/g
	let match = re.exec(html)
	let links = []
	while (match != null) {
		links.push(baseURL+'player.htm?show='+match[1])
		match = re.exec(html)
	}
	links = h.cleanList(links)
	return links
}
const getList = (url) => got(url).then(parseList, h.err)

const adaptResult = (result) => {
	result.network = 'swr'
	return result
}

const main = () => getList(listURL).then(h.getMetaList(h.id), h.err)

module.exports = main