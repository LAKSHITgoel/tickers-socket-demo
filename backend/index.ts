import Redis from 'ioredis';
import {createServer} from 'http';
import {Server} from 'socket.io';
const cors = require('cors');
const express = require('express');
import {Response, Request} from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());

const client = new Redis(6379, 'localhost');

const publisher = client.duplicate();
const subscriber = client.duplicate();

const stocks = [
  "HDFC",
  "GMRINFRA",
  "TATA MOTORS",
  "LIC",
  "NTPC",
  "HAL",
  "RELIANCE",
];

const tickerDatabatch: Record<string, TickerType[]> = {
  "HDFC": [],
  "GMRINFRA": [],
  "TATA MOTORS": [],
  "LIC": [],
  "NTPC": [],
  "HAL": [],
  "RELIANCE": [],
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

publisher.on('error', (error) => console.log('Error', error));
publisher.on('connect', (...args) => {
  console.log('Connect', args);
  publishStockData();
});

subscriber.subscribe('stock_channel', (err, count) => console.log('Subscribe', count));
subscriber.on('message', (channel, message) => {
  io.emit(channel, message);
  const currentMessage = JSON.parse(message) as TickerType;
  tickerDatabatch[currentMessage?.symbol] = [...tickerDatabatch[currentMessage?.symbol], currentMessage];
  handleRedisDb();
})

app.get('/ticker-data', (_: Request, res: Response) => {
  client.get('ticker_data', (err, result) => {
    if (result) {
      const currentTickerDataInDb = JSON.parse(result);
        res.status(200).json(currentTickerDataInDb);
      }
    });
});

function handleRedisDb () {
  setInterval(() => {
    client.get('ticker_data', (err, result) => {
      if (result) {
        let currentTickerDataInDb = JSON.parse(result);
          currentTickerDataInDb = {...currentTickerDataInDb, ...tickerDatabatch};
          client.set("ticker_data", JSON.stringify(currentTickerDataInDb));
        }
      });
  }, 6000);
}

function publishStockData() {
  setInterval(() => {
      stocks.forEach(stock => {
          const timestamp = Math.floor(Date.now() / 1000);
          const price = parseFloat((Math.random() * (200 - 100 + 1) + 100).toFixed(2));
          const quantity = Math.floor(Math.random() * 100) + 1;
          const data: TickerType = {
              timestamp,
              symbol: stock,
              price,
              quantity
          };
          publisher.publish('stock_channel', JSON.stringify(data));
      });
  }, 5000);
}

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});

type TickerType = {
  timestamp: number,
  symbol: string,
  price: number,
  quantity: number
};
