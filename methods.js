const model = require('./model.js');

// Create and Save a new model
exports.create = (req, res) => {

    const book = new model({
        category: req.body.category ,
        name: req.body.name ,
        author: req.body.author
    });

    // Save model in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the model."
        });
    });
};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
    model.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
};

// Find a single book with a bookid
exports.findOne = (req, res) => {
    
    model.findById(req.params.bookid)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.bookid
        });
    });
    
    
};
exports.findname = (req, res, next) => {
    console.log("called..")
    model.find({"name":req.name})
    // .then(book => {
    //     if(!book) {
    //         return res.status(404).send({
    //             message: "model not found  " + req.body.name
    //         });            
    //     }
    //     res.send(book);
    // }).catch(err => {
    //     if(err.kind === 'ObjectId') {
    //         return res.status(404).send({
    //             message: "model not found  " +  req.body.name
    //         });                
    //     }
    //     return res.status(500).send({
    //         message: "Error retrieving book " +  req.body.name
    //     });
    // });
    // next();
    
};



// Update a book identified by the bookid in the request
exports.update = (req, res) => {

    // Find and update it with the request body
    model.findByIdAndUpdate(req.params.bookid, {
        category: req.body.category ,
        name: req.body.name ,
        author: req.body.author
    
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });                
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.bookid
        });
    });
};

// Delete a book with the specified bookid in the request
exports.delete = (req, res) => {
    model.findByIdAndRemove(req.params.bookid)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });
        }
        res.send({message: "model deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "model not found with id " + req.params.bookid
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.bookid
        });
    });
};