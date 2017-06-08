'use strict'

const got = require('got')
const find = require('lodash.find')
const h = require('./helpers')

const getTopicID = () =>
    got('http://il.srgssr.ch/integrationlayer/1.0/ue/srf/tv/topic.json', {json: true})
    .then((res) => res.body)
    .then((res) => find(res.Topics.Topic, (o) => o.title === "Dokumentationen").id)

const getItemID = (res) =>
    res.id
    // res.AssetMetadatas.AssetMetadata[0].id

const parseItem = (item) => ({
    title: item.AssetMetadatas.AssetMetadata[0].title,
    description: item.AssetMetadatas.AssetMetadata[0].description,
    date: new Date(item.AssetMetadatas.AssetMetadata[0].createdDate),
    image: item.Image.ImageRepresentations.ImageRepresentation[0].url,
    link: `https://www.srf.ch/play/tv/redirect/detail/${item.id}`,
    network: 'srf',
    blocked: !!item.block
})

const getItemContent = (id) =>
    got(`http://il.srgssr.ch/integrationlayer/1.0/ue/srf/video/play/${id}.json`, {json: true})
    .then((res) => res.body)
    .then((res) => res.Video)
    .catch((err) => null)


const getTopicContent = (id) =>
    got(`http://il.srgssr.ch/integrationlayer/1.0/ue/srf/video/editorialPlayerLatestByTopic/${id}.json?pageSize=100`, {json: true})
    .then((res) => res.body)
    .then((res) => res.Videos.Video)
    .then((res) => res.map(getItemID))
    .then((res) => res.map(getItemContent))
    .then((res) => Promise.all(res))
    .then((res) => h.removeEmpty(res))
    .then((res) => res.map(parseItem))

const removeBlocked = (items) =>
    items.filter((i) => !i.blocked).map((e) => {delete e.blocked; return e})

const srf = () =>
    getTopicID()
    .then(getTopicContent)
    .then(removeBlocked)

module.exports = srf
