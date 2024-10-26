const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(publicDir, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});