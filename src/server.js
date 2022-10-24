const express = require("express");
const axios = require("axios")
const port = 3001;

const app = express();

const cors = require("cors")
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        res.json(response.data)
    }
    catch (err) {
        res.status(500)
    }
})

app.get('/Coin', async (req, res) => {
    const id = req.query.id
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        res.json(response.data)
    }
    catch (err) {
        res.status(500)
    }
})

app.listen(port);
console.log('alou');