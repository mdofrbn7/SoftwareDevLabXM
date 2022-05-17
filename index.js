console.log("Starting Application...")
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000; 
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
require('dotenv/config');


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to DB");    
}).catch(err => {
    console.log('Could not connect to DB', err);
    process.exit();
});


app.get('/library', (req, res) => {
    res.json({"message": "Welcome "});
});






const datas = require('./methods.js');
// routes
 // Create
 app.post('/library/books', datas.create);

 // Retrieve all 
 app.get('/library/books', datas.findAll);

 // Retrieve single data with Id
 app.get('/library/books/:bookid', datas.findOne);

 // Update with Id
 app.put('/library/books/:bookid', datas.update);

 // Delete with Id
 app.delete('/library/books/:bookid', datas.delete);







 // Retrieve single data with Id
 
//  app.all('/library/books/:bookname', datas.findname);

//  // Update with Id
//  app.put('/library/books/:bookname', datas.updateWithname);

//  // Delete with Id
//  app.delete('/library/books/:bookname', datas.deleteWithname);



app.listen(port, () => {
    console.log("Server is listening on port "+port); 
});
