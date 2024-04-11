const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 8080;
const cors = require("cors")
const heroes = [{
    id: 1,
    name: "Hero1"
}, {
    id: 2,
    name: "Hero2"
}, {
    id: 3,
    name: "Hero3"
}, {
    id: 4,
    name: "Hero4"
}, {
    id: 5,
    name: "Hero5"
},]

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/heroes", (req, res) => {
    res.json({ status: "OK", message: "Get heroes successful", data: heroes })
})
app.get("/heroes/:id", (req, res) => {
    const heroFound = heroes.find(hero => hero.id === Number(req.params.id))
    if (heroFound) {
        res.json({ status: "OK", message: "Get hero successful", data: heroFound })
    }else{
        res.json({ status: "FAIL", message: "Get hero failed", data: [] })
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});

