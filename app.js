const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const fs = require('fs');
let data = JSON.parse(fs.readFileSync("data.json", 'utf8'));
//var app = express();
 const writeData = (data) => {
     fs.writeFileSync('data.json',JSON.stringify(data,null,3),"utf8")
 }

const app = express();
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views')) // specify the views directory

app.use('/', express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {
  res.render('index', {
      data: data
  })
})

// berkunjung ke router http://localhost:3000/add
app.get('/add', (req, res) => {
  res.render('add')
})

app.get('/edit/:id', (req, res) => {
  let id = req.params.id
  let item = data[id]
  // console.log(data);
  res.render('edit', {
      item, id
  })

})

// berkunjung ke router http://localhost:3000/add dengan metode post
app.post('/add', (req, res) => {
  data.push({
      string: req.body.string,
      integer: req.body.integer,
      float: req.body.float,
      date: req.body.date,
      boolean: req.body.boolean
  })
  writeData(data)
  res.redirect('/')
})

app.post('/edit/:id', (req, res) => {
  let id = req.params.id
  data[id] = {
      string: req.body.string,
      integer: req.body.integer,
      float: req.body.float,
      date: req.body.date,
      boolean: req.body.boolean
  }
  writeData(data)
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  let id = req.params.id
  data.splice(id, 1)
  writeData(data)
  res.redirect('/');
})

app.listen(3000, () => {
    console.log(`web ini berjalan di port 3000!`)
  })


 