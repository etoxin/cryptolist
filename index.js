var fetch = require('node-fetch');

const _ = require('lodash');
const chalk = require('chalk');
const log = console.log;

var url = 'https://api.coinmarketcap.com/v1/ticker/';

const dataTable = {
    btc: { name: 'bitcoin', shorthand: 'btc' },
};

var data = {};

console.log('running');


fetch(url)
    .then(function(res) {
        return res.json();
    }).then(function (json) {
        data = json;

        var eth = _.head(_.filter(data, { symbol: 'ETH' }));

        console.log(eth);

        var change7 = eth.percent_change_7d.indexOf('-') >= 0 ? 'red' : 'green';
        var change24 = eth.percent_change_24h.indexOf('-') >= 0 ? 'red' : 'green';
        var change1 = eth.percent_change_1h.indexOf('-') >= 0 ? 'red' : 'green';

        log(`ETH: ${chalk.yellow('$'+eth.price_usd)}, 7D: ${chalk[change7](eth.percent_change_7d+'%')} 24HR: ${chalk[change24](eth.percent_change_24h+'%')} 1HR: ${chalk[change1](eth.percent_change_1h+'%')}
        `);
    });
