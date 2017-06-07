'use strict'

const got = require('got')
const dom = require('cheerio')
const h = require('./helpers')

const baseURL = 'http://www.dw.com'
const listURL = 'http://www.dw.com/de/media-center/alle-inhalte/s-100814?filter=&programs=293837&sort=date&results=1000'

const parseList = (res) => {
	const $ = dom.load(res.body)
	const links = []
	$('div.news.searchres.hov').each((i, el) => {
		links.push(baseURL+$(el).children('a').first().attr('href'))
	})
	return h.cleanList(links)
}
const getList = (url) => got(url).then(parseList)

const adaptResult = (result) => {
	result.title = result.title.substring(0, result.title.length-67)
	result.network = 'dw'
	return result
}

const main = () => getList(listURL).then(h.getMetaList(adaptResult))

module.exports = main
