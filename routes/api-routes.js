const router = require('express').Router()
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

//POST /api/events (create a new event)
router.post('/events', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'events')
    const event = req.body

    await collection.insertOne(event)

    res.json({ message: 'Event created' })
})

// GET /api/events/:id (get a single event)
router.get('/api/events/:id', async (req, res) => {
    const { id } = req.params.id
    const collection = await getCollection('foodtruck-api', 'events')
    const event = await collection.findOne({ "_id": ObjectId(id) })

    res.json(event)
})



module.exports = router