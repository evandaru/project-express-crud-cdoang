const express = require('express');
const app = express()
const port = 3000

// 🔥 buat nganu json
const fs = require('fs');
const bodyParser = require('body-parser')

//buat deklarasikan ejs dan membolehkan I/O di JSON
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

fs.readFile('data/data.json', (err, data) => {
    const dataMhs = JSON.parse(data)
    app.get('/', (req, res) => {
        res.render('index', { data: dataMhs })
    })

    app.post('/tambahdata', (req, res) => {
        const dataBaru = req.body
        dataMhs.push(dataBaru)
        fs.writeFile('data/data.json', JSON.stringify(dataMhs), (err) => {
            console.log('newData')
            res.redirect('/');
        })
    })

})
app.listen((port), () => console.log(`running http://localhost:${port}`))