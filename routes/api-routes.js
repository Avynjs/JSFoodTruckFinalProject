const router = require('express').Router()
const { getCollection, ObjectId } = require('../foodtruck-db')

// GET /api/menu (getting all tasks)
router.get('/menu', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'menu')
    const menu = await collection.find().toArray()

	res.json(menu)
})


module.exports = router