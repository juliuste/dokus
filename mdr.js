'use strict'

const got = require('got')
const dom = require('cheerio')
const h = require('./helpers')

const startURL = 'http://www.mdr.de/mediathek/themen/reportage/index.html'
const baseURL = 'http://mdr.de/'

const parseStart = (res) => {
	let html = res.body.replace(/\s/g, "")
	const re = /mediathek\/themen\/reportage\/mediathek-reportagen-dokumentationen-100_([^"]+)"/g
	let match = re.exec(html)
	let links = []
	while(match != null){
		links.push('/mediathek/themen/reportage/mediathek-reportagen-dokumentationen-100_'+match[1])
		match = re.exec(html)
	}
	return baseURL+links[0]
}
const getStart = (url) => got(url).then(parseStart, h.err)

const parseList = (res) => {
	const $ = dom.load(res.body)
	const links = []
	$('h4.shortHeadline').children('a').filter((i, el) => 
		$(el).attr('href').substring(0,33)==='/mediathek/themen/reportage/video'
	).each((i, el) => {
		links.push($(el).attr('href'))
	})
	return h.cleanList(links).map((el) => baseURL+el)
}
const getList = (url) => got(url).then(parseList, h.err)

const adaptResult = (result) => {
	result.title = result.title.substring(0, result.title.length-9)
	result.network = 'mdr'
	return result
}

const main = () => getStart(startURL).then(getList, h.err).then(h.getMetaList(adaptResult), h.err)

module.exports = main