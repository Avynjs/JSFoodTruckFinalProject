const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/menu', require('./routes/api-routes'))
app.use(require('./routes/static'))

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))