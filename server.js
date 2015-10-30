/*jslint node: true */
/*jshint node: true */
'use strict';

var express = require("express"),
    app = express(),
    fs = require('fs');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/autocomplete.html');
});

//match entire word
app.get('/api/search', function (req, res) {
    var value = req.query.value;
    search(req, res, value, 'word');
});

//match partial string
app.get('/api/query', function (req, res) {
    var value = req.query.value;
    search(req, res, value, 'partial');
});

function search(req, res, value, matchBy) {
    var value = req.query.value;
    fs.readFile('autocomplete.json', 'utf8', function (err, data) {
        if (err) {
            return res.send(err);
        }
        var obj = JSON.parse(data);

        if (value === '') {
            var vals = Object.keys(obj).map(function (key) {
                return obj[key];
            });
            res.json(vals);
        } else {
            var results = [];
            if (matchBy === 'word') {
                obj.forEach(function (item) {
                    if (item.label === value) {
                        results.push(item);
                    }
                });
            } else {
                obj.forEach(function (item) {
                    if (item.label.indexOf(value) != -1) {
                        results.push(item);
                    }
                });
            }
            res.json(results);
        }
    });
}


app.listen(3000, function () {
    console.log("listening on port 3000");
});
