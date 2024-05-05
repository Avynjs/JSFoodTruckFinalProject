const router = require('express').Router()
const { request } = require('express')
const { getCollection, ObjectId } = require('../foodtruck-db')

// GET /api/menu (getting all menu items)
router.get('/menu', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'menu')
    const menu = await collection.find().toArray()

	res.json(menu)
})

// GET /api/events (get all events)
router.get('/events', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'events')
    const events = await collection.find().toArray()

    res.json(events)
})

// GET /api/events/:id (get a single event)
router.get('/events/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('foodtruck-api', 'events')
    const event = await collection.findOne({_id: new ObjectId(id)})
    res.json(event)
})

//POST /api/events (create a new event)
router.post('/events', async (req, res) => {
const { body } = req
const { name, date } = body
const event = { name, date }

const collection = await getCollection('foodtruck-api', 'events')
const result = await collection.insertOne(event)
res.json(result)
})

// PUT /api/events/:id (update a single event)
router.put('/events/:id', async (req, res) => {
    const { body, params } = req
    const { id } = params
    const { name, date } = body
    const event = { name, date }

    const collection = await getCollection('foodtruck-api', 'events')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: event })
    res.json(result)
})

router.delete('/events/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('foodtruck-api', 'events')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    res.json(result)
})

module.exports = router