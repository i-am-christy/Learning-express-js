//importing express
const express = require('express')

//create an express app
const app = express()

//create and specify the port
const port = 3000;

//import the bookRoutes file
const bookRoutes = require("./routes/bookRoutes")

//allows us to access JSON
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Welcome to the Book API")
})

//direct every request with '/books' to the books route
app.use("/books", bookRoutes)

//listen on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})