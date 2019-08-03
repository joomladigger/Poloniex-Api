
#####################################################
Public HTTP API Methods
#####################################################
1. returnTicker
Retrieves summary information for each currency pair listed on the exchange:
curl "https://poloniex.com/public?command=returnTicker"

Field	Description:
id	Id of the currency pair.
last	Execution price for the most recent trade for this pair.
lowestAsk	Lowest current purchase price for this asset.
highestBid	Highest current sale price for this asset.
percentChange	Price change percentage.
baseVolume	Base units traded in the last 24 hours.
quoteVolume	Quoted units traded in the last 24 hours.
isFrozen	Indicates if this market is currently trading or not.
high24hr	The highest execution price for this pair within the last 24 hours.
low24hr	The lowest execution price for this pair within the last 24 hours.

Example output:
...
{ BTC_BCN:
   { id: 7,
     last: '0.00000024',
     lowestAsk: '0.00000025',
     highestBid: '0.00000024',
     percentChange: '0.04347826',
     baseVolume: '58.19056621',
     quoteVolume: '245399098.35236773',
     isFrozen: '0',
     high24hr: '0.00000025',
     low24hr: '0.00000022' },
  USDC_BTC:
   { id: 224,
     last: '6437.65329245',
     lowestAsk: '6436.73575054',
     highestBid: '6425.68259132',
     percentChange: '0.00744080',
     baseVolume: '1193053.18913982',
     quoteVolume: '185.43611063',
     isFrozen: '0',
     high24hr: '6499.09114231',
     low24hr: '6370.00000000' },
...

2. return24hVolume
curl "https://poloniex.com/public?command=return24hVolume"
Example output:
{ BTC_LTC: { BTC: '38.13504038', LTC: '4662.34229096' },
  BTC_MAID: { BTC: '10.38010322', MAID: '359919.71515255' },
...
  USDC_BTC: { USDC: '481389.13175764', BTC: '74.73988488' },
  USDC_ETH: { USDC: '72302.27016210', ETH: '357.72884034' },
  totalBTC: '2340.96441558',
  totalETH: '2771.63218462',
  totalUSDC: '681255.56961992',
  totalXMR: '267.83601213' }

3. returnOrderBook
curl "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=10"
Example output for a selected market:
{ asks: 
   [ [ '0.03142500', 16.5322 ],
     [ '0.03143140', 0.14561998 ],
     [ '0.03144000', 149.2466 ],
...
     [ '0.03175915', 3.95025486 ],
     [ '0.03176634', 0.01579061 ] ],
  bids: 
   [ [ '0.03141658', 4.75222193 ],
     [ '0.03141644', 0.05252027 ],
     [ '0.03141608', 0.20943191 ],
...
     [ '0.03129457', 0.01861854 ],
     [ '0.03128648', 0.47593681 ] ],
  isFrozen: '0',
  seq: 595100792 }
  
4. returnTradeHistory
Returns the past 200 trades for a given market, or up to 1,000 trades between a range specified in UNIX timestamps by the "start" and "end" GET parameters. Fields include:

Field	Description
globalTradeID	The globally unique ID associated with this trade.
tradeID	The ID unique only to this currency pair associated with this trade.
date	The UTC date and time of the trade execution.
type	Designates this trade as a buy or a sell from the side of the taker.
rate	The price in base currency for this asset.
amount	The number of units transacted in this trade.
total	The total price in base units for this trade.

curl "https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH"
curl "https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&start=1410158341&end=1410499372"

Example output:

[ { globalTradeID: 394604821,
    tradeID: 45205037,
    date: '2018-10-22 15:03:57',
    type: 'sell',
    rate: '0.03143485',
    amount: '0.00009034',
    total: '0.00000283' },
  { globalTradeID: 394604809,
    tradeID: 45205036,
    date: '2018-10-22 15:03:47',
    type: 'buy',
    rate: '0.03143485',
    amount: '0.00770177',
    total: '0.00024210' },
...
  { globalTradeID: 394603147,
    tradeID: 45204939,
    date: '2018-10-22 14:31:59',
    type: 'sell',
    rate: '0.03139500',
    amount: '0.00041216',
    total: '0.00001293' },
  { globalTradeID: 394603133,
    tradeID: 45204938,
    date: '2018-10-22 14:31:41',
    type: 'sell',
    rate: '0.03140030',
    amount: '2.42099000',
    total: '0.07601981' } ]

5.returnChartData
Returns candlestick chart data. Required GET parameters are "currencyPair",
"period" (candlestick period in seconds; valid values are 300, 900, 1800, 7200, 14400, and 86400), 
"start", and "end". "Start" and "end" are given in UNIX timestamp format and used to specify the date
range for the data returned. Fields include:
curl "https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1546300800&end=1546646400&period=14400"

Input Fields
Field	Description
currencyPair	The currency pair of the market being requested.
period	Candlestick period in seconds. Valid values are 300, 900, 1800, 7200, 14400, and 86400.
start	The start of the window in seconds since the unix epoch.
end	The end of the window in seconds since the unix epoch.

Output Fields
Field	Description
date	The UTC date for this candle in miliseconds since the Unix epoch.
high	The highest price for this asset within this candle.
low	The lowest price for this asset within this candle.
open	The price for this asset at the start of the candle.
close	The price for this asset at the end of the candle.
volume	The total amount of this asset transacted within this candle.
quoteVolume	The total amount of base currency transacted for this asset within this candle.
weightedAverage	The average price paid for this asset within this candle.

Example output:
[ { date: 1539864000,
    high: 0.03149999,
    low: 0.031,
    open: 0.03144307,
    close: 0.03124064,
    volume: 64.36480422,
    quoteVolume: 2055.56810329,
    weightedAverage: 0.03131241 },
  { date: 1539878400,
    high: 0.03129379,
    low: 0.03095999,
    open: 0.03124064,
    close: 0.03108499,
    volume: 50.21821153,
    quoteVolume: 1615.31999527,
    weightedAverage: 0.0310887 },
...
  { date: 1540195200,
    high: 0.03160347,
    low: 0.03140002,
    open: 0.031455,
    close: 0.03151499,
    volume: 21.44394862,
    quoteVolume: 681.30276558,
    weightedAverage: 0.03147491 },
  { date: 1540209600,
    high: 0.03153475,
    low: 0.031265,
    open: 0.03151497,
    close: 0.03141781,
    volume: 39.82606009,
    quoteVolume: 1268.53159161,
    weightedAverage: 0.0313954 } ]
   
6. returnCurrencies
curl "https://poloniex.com/public?command=returnCurrencies"
Example output:

{ '1CR': 
   { id: 1,
     name: '1CRedit',
     txFee: '0.01000000',
     minConf: 10000,
     depositAddress: null,
     disabled: 1,
     delisted: 1,
     frozen: 0 },
  ABY: 
   { id: 2,
     name: 'ArtByte',
     txFee: '0.01000000',
     minConf: 10000,
     depositAddress: null,
     disabled: 1,
     delisted: 1,
     frozen: 0 },
...
  ZEC: 
   { id: 286,
     name: 'Zcash',
     txFee: '0.00100000',
     minConf: 8,
     depositAddress: null,
     disabled: 0,
     delisted: 0,
     frozen: 0 },
  ZRX: 
   { id: 293,
     name: '0x',
     txFee: '5.00000000',
     minConf: 30,
     depositAddress: null,
     disabled: 0,
     delisted: 0,
     frozen: 0 } }

Returns information about currencies. Fields include:
Field	Description
name	Name of the currency.
txFee	The network fee necessary to withdraw this currency.
minConf	The minimum number of blocks necessary before a deposit can be credited to an account.
depositAddress	If available, the deposit address for this currency.
disabled	Designates whether (1) or not (0) deposits and withdrawals are disabled.
delisted	Designates whether (1) or not (0) this currency has been delisted from the exchange.
frozen	Designates whether (1) or not (0) trading for this currency is disabled for trading.

7. returnLoanOrders
curl "https://poloniex.com/public?command=returnLoanOrders&currency=BTC"
Returns the list of loan offers and demands for a given currency, 
specified by the "currency" GET parameter. Fields include:

Field	Description
rate	The interest rate in percentage per day charged for this loan.
amount	The total number of units available at this rate and within this range.
rangeMin	The lowest duration in days offered by the loans within this group.
rangeMax	The highest duration in days offered by the loans within this group.

Example output:
{ offers: 
   [ { rate: '0.00005900',
       amount: '0.01961918',
       rangeMin: 2,
       rangeMax: 2 },
     { rate: '0.00006000',
       amount: '62.24928418',
       rangeMin: 2,
       rangeMax: 2 },
...
     { rate: '0.00007037',
       amount: '0.03083815',
       rangeMin: 2,
       rangeMax: 2 } ],
  demands: 
   [ { rate: '0.02000000',
       amount: '0.00100014',
       rangeMin: 2,
       rangeMax: 2 },
...
     { rate: '0.00001000',
       amount: '0.04190154',
       rangeMin: 2,
       rangeMax: 2 } ] }

#####################################################
Private HTTP API Methods
#####################################################
All calls to the trading API are sent via HTTP using POST parameters 
to https://poloniex.com/tradingApi and must contain the following headers:

Key - Your API key.
Sign - The query's POST data signed by your key's "secret" according to the HMAC-SHA512 method.
Additionally, all queries must include a "nonce" POST parameter. 
The nonce parameter is an integer which must always be greater than the previous nonce used 
and does not need to increase by one. 
Using the epoch in milliseconds is an easy choice here but be careful about 
time synchronization if using the same API key across multiple servers.

All responses from the trading API are in JSON format. 
In the event of an error, the response will always be of the following format:

{ "error": "<error message>" }

There are several methods accepted by the trading API, 
each of which is specified by the "command" POST parameter:
  

1. returnBalances
# Note: set the nonce to the current milliseconds. 
For example: date +%s00000
echo -n "command=returnBalances&nonce=154264078495300" | \
openssl sha512 -hmac $API_SECRET

curl -X POST \
     -d "command=returnBalances&nonce=154264078495300" \
     -H "Key: 7BCLAZQZ-HKLK9K6U-3MP1RNV9-2LS1L33J" \
     -H "Sign: 2a7849ecf...ae71161c8e9a364e21d9de9" \
     https://poloniex.com/tradingApi

Example output:

{ '1CR': '0.00000000',
  ABY: '0.00000000',
  AC: '0.00000000',
...
  YIN: '0.00000000',
  ZEC: '0.02380926',
  ZRX: '0.00000000' }
Returns all of your balances available for trade after having deducted all open orders.





