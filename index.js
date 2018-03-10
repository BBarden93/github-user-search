const dotenv = require('dotenv').config
const axios = require('axios')
httpClient = axios.create()
const express = require('express')
const app = express()
const PORT = 3000

app.get('/users/:name', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.github.com/users/${req.params.name}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }
    httpClient(options).then((apiResponse) => {
        const name = apiResponse.data.login
        const location = apiResponse.data.created_at
        const repo = apiResponse.data.public_repos
        const bio = apiResponse.data.bio
        const image = apiResponse.data.avatar_id
        const html = `
        <h1>${name}</h1>
        <ul>
            <li>${location}</li>
            <li>${repo}</li>
            <li>${bio}</li>
            <img src = "${image}" />        
        </ul>
        `
        res.send(html)
    })
}) 

app.listen(PORT, (err) => {
    console.log(err || `Andre ${PORT}`)
})