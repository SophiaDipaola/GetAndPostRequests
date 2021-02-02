const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')

//MiddleWare
//this will help us use our layout file
app.use(expressLayouts)

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs')

//ROUTES
app.get('/', (req,res)=> {
    res.send('heellooo baayyybbeee')
})

app.get('/dinosaurs', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.JSON')
    dinos = JSON.parse(dinos)
    console.log(dinos)
    ///take our data and make it in a more readable format ^^
    //in our views folder, render this page vvv
    res.render('dinosaurs/index',{dinos: dinos})
})

app.get('/dinosaurs/new', (req,res)=>{
    res.render('dinosaurs/new')
})

app.post('/dinosaurs', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.JSON')
    dinos = JSON.parse(dinos)
    //construct new dino with req.body values
    const newDino = {
        name: req.body.name,
        type: req.body.type
    }
    //updates dinos with new dino
    dinos.push(newDino)
    fs.writeFileSync('./dinosaurs.JSON', JSON.stringify(dinos))
    res.redirect('/dinosaurs')

    //this is coming from our form submit
    //we are going to looka t the req.body
    // console.log(req.body)
})
//SHOW view
app.get('/dinosaurs/:index', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.JSON')
    dinos = JSON.parse(dinos)
    //req.params.index

    const dino = dinos[req.params.index]
    res.render('dinosaurs/show', {dino})
})

//new view




const PORT =process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`server is running on PORT:${PORT}`)
})
