const books =[]

//create getbooks function
const getBooks = (req, res) => {
    const response ={
        success: true,
        message: "Books Retrieved!",
        data: {books: books}
    }
    res.send(response)
}

//create a function to get books by authurs
const getBookByAuthor = (req, res) => {
    console.log(req.query); //log the query to see what is being passed
     console.log(req.query); //log the query to see what is being passed
    //get authur from teh query
    const {author} = req.query;;
    let filteredBooks; //initialize filteredBooks

    if(author){
        //filter books by author
        filteredBooks = books.filter(bk => bk.author === author)
    }else{
        filteredBooks = books;
    }
    const response ={
        success: true,
        message: "Books Retrieved!",
        data: {books: filteredBooks}
    }
    res.send(response) 
}

//function to create book
const createBook = (req, res) => {
    const data = req.body

    const {name, authour} = data //destructure the name and authour from the data
    const existingBook = books.find(book => book.name === name && book.authour === authour) //check if the book already exists
    if (existingBook) {
        return res.status(400).send({
            success: false,
            message: "Book already exists",
            data: {book: existingBook}
        })
    }
    //define the book
    const newBook = {
        id: books.length + 1, //increment the id based on the length of the books array
        ...data //spread operator to include all properties from data
    }
    //add the new book to the books array
    books.push(newBook)

    //create a response object
    const response ={
        success: true,
        message: "Book successfully created",
        data: {book: newBook}
    }
    //send the response object
    res.send(response)
}

//function to get a book by id
const getBookById = (req, res) => {
    //get book id from request parameter
    const bookId = req.params.id
    //find the book with the given id
    const book = books.find(bk => bk.id === parseInt(bookId)) //parseInt to convert string to number
    //if book not found, return error response
    if (!book) {
        return res.status(404).send(
            {
                success: false,
                message: "Book not found",
                data: {}
            }
        )
    }
    //if book found, return success response
    const response = {
        success: true,
        message: "Book retrieved successfully",
        data: {book}
    }
    res.status(201).send(response)

}

// Update book by ID
const updateBook = (req, res) => {
    const bookId = req.params.id;
    const data = req.body;

    const bookIndex = books.findIndex(bk => bk.id === parseInt(bookId));
    if (bookIndex === -1) {
        return res.status(404).send({
            success: false,
            message: "Book not found!"
        });
    }

    books[bookIndex] = {
        ...books[bookIndex],
        ...data
    };

    res.status(200).send({
        success: true,
        message: "Book updated successfully",
        data: { book: books[bookIndex] }
    });
};

//export the function
module.exports = {
    getBooks,
    createBook,
    getBookById,
    updateBook, 
    getBookByAuthor
}