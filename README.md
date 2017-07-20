# 📦 Pay.ir Node.js Module

[![N|Solid](https://pay.ir/assets/img/logo.png.pagespeed.ce.DAyscoRFh0.png)](https://pay.ir)

[نسخه فارسی مستندات این پکیج](http://github.com/erfansahaf/payir/blob/master/Fa.md)


By using this package, you'll be able to work with Pay.ir REST Api in Node.js (Back-End) without any problem! This package is usable for all Node.js Frameworks such as Express.js, Hapi.js, Sails.js, Adonis.js or others.

This package uses ECMASCRIPT 6 features so make sure that your Node.js version supports it.

# First step, Installation and Initialization

First of all, install the module with NPM command:

```sh
$ npm install payir --save
``` 

Then, create an instance of Payir class and pass your Gateway API KEY to it:

```js
const Payir = require('payir');
const gateway = new Payir('YOUR API KEY');
```

# Second step, Send Request

## `send` Method:

After initializing, you should send a payment request in order to receive the `transId` and redirect user to the Bank.

Hopefuly, you can get rid of the Callback functions by using Promises:

```js
app.get('/', (req, res) => {
    gateway.send(1000, 'http://your-site.ir/verify')
            .then(link => res.redirect(link))
            .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
});
```

First parameter is `amount` of the transaction, the second one is your `callback URL` and the third one is the `invoice number` (optional).

If operations are done successfully, you'll have access to payment URL in `then`, otherwise you can read error message in `catch`.

The error message might be a Farsi text; Therefore, make sure your page supports UTF-8 encoding.

# Third step, Verify Request

## `verify` Method:

When user perform the transaction, it will redirect to your callback URL, so you should verify that in a POST route.

The only parameter of the `verify` method is your POST request body. There are differences between Node.js web frameworks so you should pass it accurate. For example:

```js
// How to access to POST data

// Express.js
console.log(request.body.var_name);
// Hapi.js
console.log(request.payload.var_name);
```

So in `express.js` framework we will have:

```js
app.post('/verify', (req, res) => {
    // Pass POST Data Payload (Request Body) to verify transaction
    gateway.verify(req.body)
        .then(data => res.end('Payment was successful.'))
        .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
});
```

When transaction is done,  `then` will have an input object that contains following values:

|      Key      	|                            Description                           	|
|:-------------:	|:----------------------------------------------------------------:	|
|  factorNumber 	| The Invoice number that you passed to send method in second step 	|
| transactionId 	|                   The unique id of the transaction                   	|
|     amount    	|                     The amount of transaction                    	|
|   cardNumber  	|                      The User's bank card number                     	|

# Test Mode

By using `test` string instead of your gateway API Key, you can test your code.

# License

This package is under Apache 2.0 license.