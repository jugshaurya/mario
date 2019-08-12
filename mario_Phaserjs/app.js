const express = require('express')
const app = express()


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(3000, function(){
    console.log('working..')
})