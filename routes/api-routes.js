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

module.exports = router