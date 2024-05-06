const router = require('express').Router()
//const { request } = require('express')
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

// POST /api/menu (add new menu item)
router.post('/menu', async (req, res) => {
    const { item, description, price } = req.body
    const collection = await getCollection('foodtruck-api', 'menu')

    const result = await collection.insertOne({ item, description, price })

    res.json(result)
})

// POST /api/events (create a new event)
router.post('/events', async (req, res) => {
    const { body } = req
    const { name, date, hours, location } = body
    const event = { name, date, hours, location }

    const collection = await getCollection('foodtruck-api', 'events')
    const result = await collection.insertOne({ name, date, hours, location })
    res.json(result)
})

// PUT /api/menu/:id (update a single menu item)
// This successfully puts, but the data is all null. Will look into in the morning
router.put('/menu/:id', async (req, res) => {
    const { body, params } = req
    const { id } = params
    const { item, description, price } = body
    const menu = { item, description, price }

    const collection = await getCollection('foodtruck-api', 'menu')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, {$set: menu})
    res.json({ item, description, price })
})

// PUT /api/events/:id (update a single event)
router.put('/events/:id', async (req, res) => {
    const { body, params } = req
    const { id } = params
    const { name, date, hours, location } = body
    const event = { name, date, hours, location }

    const collection = await getCollection('foodtruck-api', 'events')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: event })
    res.json({ name, date, hours, location })
})

// DELETE /api/menu/:id (Delete a single menu item)
router.delete('/menu/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('foodtruck-api', 'menu')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    res.json(result)
})

// DELETE /api/events/:id (delete a single event)
router.delete('/events/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('foodtruck-api', 'events')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    res.json(result)
})

module.exports = router