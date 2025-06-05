//import express
const express = require('express')

//create router
const router = express.Router()
//import controller
const controller = require("../controllers/bookController")

//get request for books
router.get("/", controller.getBooks)

//create a new book
router.post("/", controller.createBook)

//get a book by id
router.get("/:id", controller.getBookById)

//update the book by id
router.patch("/:id", controller.updateBook)

//export the routes
module.exports = router