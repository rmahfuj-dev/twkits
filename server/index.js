const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Server is active")
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const twkits = client.db(process.env.DB)
        const components = twkits.collection("components")

        // api to get componets name for sidebar
        app.get("/components/names", async (req, res) => {
            try {
                const query = await components.find({}, {
                    projection: { name: 1 }
                }).toArray()
                res.status(200).json(query)
            } catch (err) {
                res.status(404).json({ message: "Data not found" })
            }

        })

    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);

})