const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dd29rey.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const taskCollection = client.db("ToDoList").collection("allTasks");

    app.post("/addTasks", async (req, res) => {
      const tasks = req.body;
      console.log(tasks);
      const result = await taskCollection.insertOne(tasks);
      res.send(result);
    });

    app.get("/getTasks", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    app.delete('/deleteTask/:id',async(req,res)=>{
        const id = req.params.id;
        // console.log(id);
        const query = {_id : new ObjectId(id)}
        const result = await taskCollection.deleteOne(query)
        res.send(result);
    })

    app.get('/getSingleTask/:id',async(req,res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {_id : new ObjectId(id)}
      const result = await taskCollection.findOne(query)
      res.send(result); 
    })






  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task management server is running smoothly");
});

app.listen(port, () => {
  console.log(`Task management server is running on port ${port}`);
});
