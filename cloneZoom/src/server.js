import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const __dirname = path.resolve();

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/src/views');

app.use('/public', express.static(__dirname + '/src/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.render('/')); // 기본 url 설정

const handleListening = () =>
  // listening 설정
  console.log(`Listening on: http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server }); // http, ws server 동시 실행

// ws 부분
wss.on('connection', (socket) => {
  console.log('Connected to Browser ✅');
  socket.on('close', () => console.log('Disconnected from the Browser ❌'));
  socket.on('message', (message) => {
    console.log(message);
  });
  socket.send('hello!!!');
});

server.listen(3000, handleListening);
