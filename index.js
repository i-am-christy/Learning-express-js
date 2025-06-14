//importing express
const express = require('express')

//create an express app
const app = express()

//import morgan-request logger middle ware for express
const morgan = require('morgan')

//create and specify the port
const port = 3000;


//import the bookRoutes file
const bookRoutes = require("./routes/bookRoutes")

//allows us to access JSON
app.use(express.json())

//use express static, to tell express that our static files are in teh public folder
app.use(express.static("public"))

//use the morgan middle ware
app.use(morgan('combined'))

//creating a middle ware to handle response, requests amd next
app.use((req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            throw Error("Authorization header not found!");
        }

        const token = authorization.split(" ")[1];

        if (token !== "sometoken") {
            throw Error("Invalid Authorization Header! You are not logged in!");
        }

        next(); // go to the next route
    } catch (error) {
        const response = {
            success: false,
            message: error.message
        };
        res.status(401).send(response); // this line was broken before
    }
});


app.get("/", (req, res) => {
    res.send("Welcome to the Book API")
})

//direct every request with '/books' to the books route
app.use("/books", bookRoutes)

//listen on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})