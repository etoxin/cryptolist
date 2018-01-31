#!/usr/bin/env node

const fetch = require('node-fetch');
const _ = require('lodash');
const chalk = require('chalk');
const leftpad = require('leftpad');
const rightpad = require('rightpad');

/**
 * @class crypto
 */
class Crypto {
    constructor() {
        this.url = 'https://api.coinmarketcap.com/v1/ticker/';
        this.data = {};

        this.fetchData(() => {
            this.results();
        });
    }

    /**
     * Results
     */
    results() {
        //           BTC: $9850.18     -9.74%  -11.93%   -1.94%
        console.log(`Sym  Price (USD)   7D      24HR      1HR`);
        console.log(`------------------------------------------`);
        for (let rank = 1; rank < 11; rank++) {
            this.logData(_.head(_.filter(this.data, { rank: String(rank) })));
        }
    }

    /**
     * @param {object} dataRow
     */
    logData(dataRow) {
        const change7 = dataRow.percent_change_7d.indexOf('-') >= 0 ? 'red' : 'green';
        const change24 = dataRow.percent_change_24h.indexOf('-') >= 0 ? 'red' : 'green';
        const change1 = dataRow.percent_change_1h.indexOf('-') >= 0 ? 'red' : 'green';
        const price = rightpad('$'+dataRow.price_usd, 10, ' ');

        console.log(`${dataRow.symbol}: ${chalk.yellow(price)} ${chalk[change7](leftpad(dataRow.percent_change_7d+'%',8,' '))} ${chalk[change24](leftpad(dataRow.percent_change_24h+'%', 8, ' '))} ${chalk[change1](leftpad(dataRow.percent_change_1h+'%',8,' '))}`);
    }

    /**
     * @param {function} cb Callback
     */
    fetchData(cb) {
        const self = this;
        fetch(self.url).then(function(res) {
            return res.json();
        }).then(function (json) {
            self.data = json;
            cb();
        });
    }
}

new Crypto();