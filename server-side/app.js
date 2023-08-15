const users = require('./routes/users');
const fs = require('fs');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const commits = require('./routes/commits')
const products = require('./routes/products')
const messages = require('./routes/messages')
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const password = encodeURIComponent(process.env.PASSWORD);
const uri = `mongodb+srv://hananfruman:${password}@server-side.2g18t.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("connected to MongoDB..."))
    .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/commits', commits);
app.use('/api/products', products);
app.use('/api/messages', messages);





const port = process.env.PORT || 3900;
http.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}...`));

