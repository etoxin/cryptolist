<h1 align="center">
	<br>
	<br>
	<img width="320" src="https://raw.githubusercontent.com/etoxin/cryptolist/master/preview.png" alt="chalk">
	<br>
	<br>
	<br>
</h1>

# Cryptolist

Get a list of the current prices of cryptocurrencies.

## Installation

```
npm install -g cryptolist
```

To Upgrade run `npm upgrade -g cryptolist`

## Usage

On your cli enter the following:

```
crypto
```

```
crypto --convert usd --size 5
```

```
crypto -c aud -s 20
```

## Options

### Convert to currency

You can convert to other currencies with `--convert` or `-c`

##### Show prices in ETH

```
crypto --convert eth
```

##### Show prices in AUD

```
crypto -c aud
```

### Size

To show more currencies use the following option `--size` or `-s`

```
crypto -s 20
```
