const express = require('express')
const app = express();
const port = 8080;
const path = require("path")
// TO CREATE NEW AND UNIQUE ID WITH THE HELP OF UUIDV4
const { v4: uuidv4 } = require('uuid');
// METHOD OVERIDE HELP TO OVER-RIDE THE DELETE AND PATCH METHOD TO THE HTML FILE
var methodOverride = require('method-override')
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))


let posts = [
    {
        id: uuidv4(),
        username : "apnacollage",
        content : "I love coding"
    },
    {
        id: uuidv4(),
        username : "Integral University",
        content : "A collage that content all the cources"
    },
    {
        id: uuidv4(),
        username : "AKTU",
        content : "College with less money"
    },
    {
        id: uuidv4(),
        username : "Shanti ",
        content : "College "
    }
]
// ALL POST SEE, ROUTE
app.get('/posts', (req, res) =>{
    res.render('index.ejs', {posts})
})


// CREATE NEW POST, ROUTE
app.get('/posts/new', (req, res) =>{
    res.render('new.ejs')
})

app.post('/posts', (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4()
    posts.push({id, username, content})
    res.redirect("posts/")
})


// SEE DETAILS OF POST, ROUTE
app.get("/posts/:id", (req, res) =>{
    let {id} = req.params
    console.log(id);
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", {post})
})


// UPDATE ROUTE
app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    console.log({id:id})
    console.log({content: newContent});
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs", {post})
})


// DELETE ROUTE
app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts")

})

// LISTENING PORT
app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`)
})
