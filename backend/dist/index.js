"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = require("ioredis");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors = require('cors');
var express = require('express');
var app = express();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: { origin: '*' }
});
app.use(cors());
var client = new ioredis_1.default(6379, 'localhost');
var publisher = client.duplicate();
var subscriber = client.duplicate();
var stocks = [
    "HDFC",
    "GMRINFRA",
    "TATA MOTORS",
    "LIC",
    "NTPC",
    "HAL",
    "RELIANCE",
];
var tickerDatabatch = {
    "HDFC": [],
    "GMRINFRA": [],
    "TATA MOTORS": [],
    "LIC": [],
    "NTPC": [],
    "HAL": [],
    "RELIANCE": [],
};
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
publisher.on('error', function (error) { return console.log('Error', error); });
publisher.on('connect', function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log('Connect', args);
    publishStockData();
});
subscriber.subscribe('stock_channel', function (err, count) { return console.log('Subscribe', count); });
subscriber.on('message', function (channel, message) {
    io.emit(channel, message);
    var currentMessage = JSON.parse(message);
    tickerDatabatch[currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.symbol] = __spreadArray(__spreadArray([], tickerDatabatch[currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.symbol], true), [currentMessage], false);
    handleRedisDb();
});
app.get('/ticker-data', function (_, res) {
    client.get('ticker_data', function (err, result) {
        if (result) {
            var currentTickerDataInDb = JSON.parse(result);
            res.status(200).json(currentTickerDataInDb);
        }
    });
});
function handleRedisDb() {
    setInterval(function () {
        client.get('ticker_data', function (err, result) {
            if (result) {
                var currentTickerDataInDb = JSON.parse(result);
                currentTickerDataInDb = __assign(__assign({}, currentTickerDataInDb), tickerDatabatch);
                client.set("ticker_data", JSON.stringify(currentTickerDataInDb));
            }
        });
    }, 6000);
}
function publishStockData() {
    setInterval(function () {
        stocks.forEach(function (stock) {
            var timestamp = Math.floor(Date.now() / 1000);
            var price = parseFloat((Math.random() * (200 - 100 + 1) + 100).toFixed(2));
            var quantity = Math.floor(Math.random() * 100) + 1;
            var data = {
                timestamp: timestamp,
                symbol: stock,
                price: price,
                quantity: quantity
            };
            publisher.publish('stock_channel', JSON.stringify(data));
        });
    }, 5000);
}
server.listen(8080, function () {
    console.log('server running at http://localhost:8080');
});
