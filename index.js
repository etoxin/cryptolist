var fetch = require('node-fetch');

var url = 'https://api.coinmarketcap.com/v1/ticker/';

const dataTable = {
    btc: { name: 'bitcoin', shorthand: 'btc' },
};

fetch(url)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });