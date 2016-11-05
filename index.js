'use strict'

const arte = require('./arte')
const daserste = require('./daserste')
const mdr = require('./mdr')
const swr = require('./swr')
const rbb = require('./rbb')
const dw = require('./dw')

const concatLists = (list) => {
	let result = []
	for(let sublist of list){
		result = result.concat(sublist)
	}
	return result
}

const all = () => Promise.all([arte(), daserste(), mdr(), swr(), rbb(), dw()]).then((data) => concatLists(data))

module.exports = {all, arte, daserste, mdr, swr, rbb, dw}