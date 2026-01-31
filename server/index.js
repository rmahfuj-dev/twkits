const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Server is active")
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);

})