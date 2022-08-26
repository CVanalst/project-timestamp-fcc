const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

app.get("/api/:date?", function (req, res) {
    var dateParam = req.params['date']
    var unixDate
    var utcDate
    var date
    if (!dateParam) { //If Nothing
        date = new Date (Date.now())
    } else if (!isNaN(dateParam)) { //If Number
        date = new Date(parseInt(dateParam))
    } else if (isNaN(dateParam)) { //If String
        date = new Date(dateParam)
    }
    
    unixDate = Date.parse(date)
    utcDate = date.toUTCString()

    if ((unixDate || utcDate) === ("Invalid Date" || NaN)) {
        //console.log('unixDate: ' + unixDate)
        //console.log('utcDate: ' + utcDate)
        return res.json({error : "Invalid Date"})
    } else {
        return res.json({unix : unixDate, utc: utcDate})
    }
})

app.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    }else {
        console.log('Server is listening on port ' + port)
    }
})