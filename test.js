'use strict'

const t = require('./index.js')
const assert = require('assert')
const err = (error) => {console.error(error); throw new Error(error)}

const h = (network) => (items) => {
	assert(items.length>0, network)
	for(let item of items){
		assert(!!item.title, network)
		assert(!!item.link, network)
	}
}

t.arte().then(h('arte')).catch(err)
// t.daserste().then(h('daserste')).catch(err) // takes quite long to run
t.swr().then(h('swr')).catch(err)
t.mdr().then(h('mdr')).catch(err)
t.mdr().then(h('rbb')).catch(err)
t.dw().then(h('dw')).catch(err)