const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const Payir = require('./payir');
const gateway = new Payir('test');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    gateway.send(1000, 'http://localhost:'+port+'/verify')
            .then(link => res.redirect(link))
            .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
});
app.post('/verify', function(req, res){
    // Pass POST Data Payload (Request Body) to verify transaction
    gateway.verify(req.body)
        .then((data) => {
            console.log('Invoice (Factor) Number: ' + data.factorNumber);
            console.log('Transaction ID: ' + data.transactionId);
            console.log('Transaction Amount: ' + data.amount);
            console.log('Card Number: ' + data.cardNumber);
            res.end('Payment was successful.\nCheck the console for more details.');
        })
        .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
