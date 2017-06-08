'use strict'

const arte = require('./lib/arte')
const daserste = require('./lib/daserste')
const mdr = require('./lib/mdr')
const srf = require('./lib/srf')
const swr = require('./lib/swr')
const dw = require('./lib/dw')

const concatLists = (list) => {
	let result = []
	for(let sublist of list){
		result = result.concat(sublist)
	}
	return result
}

const all = () => Promise.all([arte(), daserste(), mdr(), srf(), swr(), dw()]).then((data) => concatLists(data))

module.exports = {all, arte, daserste, mdr, srf, swr, dw}
