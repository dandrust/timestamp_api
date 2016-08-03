var fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
    fs.readFile('index.html', 'utf8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data, 'utf9');
    });
});

app.get('/:string', function (req, res) {
  var dateString = req.params.string;
  var response = {};

  if (!parseInt(dateString, 10)){                       // Input is not a number 
    var naturalLangDate = new RegExp(/^((January|March|May|July|August|October|December)\s([0-9]|[1-2][0-9]|3[0-1])|(April|June|September|November)\s([0-9]|[1-2][0-9]|30)|February\s([0-9]|1[0-9]|2[0-9]))\,\s[0-9]{4}$/);
    if (naturalLangDate.test(dateString)) {             // Input is a natural date
        response['natural'] = dateString;
        response['unix'] = "" + Date.parse(dateString);
    } else {                                            // Input is neither a number nor a date
        response['natural'] = 'null';
        response['unix'] = 'null';
    }
  } else {                                          // Input is a number
      var dateObj = new Date(parseInt(dateString, 10));
      var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      response['natural'] = monthsArray[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
      response['unix'] = dateString;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));
});

app.listen(process.env.port || 8080);