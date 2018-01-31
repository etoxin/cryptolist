#!/usr/bin/env node

const fetch =    require('node-fetch');
const _ =        require('lodash');
const chalk =    require('chalk');
const program =  require('commander');
const leftpad =  require('leftpad');
const rightpad = require('rightpad');

/**
 * @class crypto
 */
class Crypto {
    constructor() {
        program.option('-c, --convert [currency]', 'Convert to currency')
               .option('-s --size [Size]', 'The amount of currencies to return')
               .parse(process.argv);

        this.convert = program.convert ? program.convert : 'usd';
        this.limit = program.size ? ++program.size : 10;
        this.url = `https://api.coinmarketcap.com/v1/ticker/?convert=${this.convert}&limit=${this.limit}`;
        this.data = {};

        this.service(() => {
            this.validate();
            this.results();
        });
    }

    validate () {
        // make sure we don't request more than the available results.
        this.limit = (this.limit <= this.data.length) ? this.limit : this.data.length;


        if (!this.currencyExists(_.head(this.data), this.convert)) {
            console.log(' ');
            console.log(chalk.yellow('Currency ' + this.convert.toUpperCase() + ' does not exist. Reverting to USD'));
        }

        this.convert = this.currencyExists(_.head(this.data), this.convert) ? this.convert: 'usd';


    }

    /**
     * Results
     */
    results() {

        // console.log(this.data);


        console.log(' ');

        // for formatting
        let c = this.convert.toUpperCase();
        
        //           BTC   12,731.37_    -7.64%   -6.12%    0.92%
        console.log(`Sym   Price (${c})      7D      24H      1HR`);
        console.log(`-------------------------------------------`);
        for (let rank = 1; rank < this.limit; rank++) {
            this.logData(_.head(_.filter(this.data, { rank: String(rank) })));
        }

        console.log(' ');
    }

    /**
     * @param {object} dataRow
     */
    logData(dataRow) {
        let change7 = dataRow.percent_change_7d.indexOf('-') >= 0 ? 'red' : 'green';
        let change24 = dataRow.percent_change_24h.indexOf('-') >= 0 ? 'red' : 'green';
        let change1 = dataRow.percent_change_1h.indexOf('-') >= 0 ? 'red' : 'green';

        let roundedPrice = dataRow['price_'+this.convert];

        let price = rightpad(this.numberWithCommas(parseFloat(roundedPrice).toFixed(2)), 10, ' ');

        console.log(`${rightpad(dataRow.symbol,5)} ${chalk.yellow(price)} ${chalk[change7](leftpad(dataRow.percent_change_7d+'%',8,' '))} ${chalk[change24](leftpad(dataRow.percent_change_24h+'%', 8, ' '))} ${chalk[change1](leftpad(dataRow.percent_change_1h+'%',8,' '))}`);


    }

    /**
     * Test to see currency is in collection
     * 
     * @param {Object} obj to test
     * @param {string} cur to test for
     * @returns {boolean}
     */
    currencyExists (obj, cur) {
        return 'price_' + cur in obj;
    }

    /**
     *
     * @param {Number} x number to add Commas
     * @returns {string}
     */
    numberWithCommas (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Fetch data from API
     * 
     * @param {function} cb Callback
     */
    service(cb) {
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