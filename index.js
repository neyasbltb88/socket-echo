let fs = require('fs');
let http = require('http');
let https = require('https');
let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let wss = expressWs.getWss();
let cors = require('cors');

const PORT = process.env.PORT || 8100;

let server;

if (process.env.SSL) {
    const key = fs.readFileSync(process.env.KEY, 'utf8');
    const cert = fs.readFileSync(process.env.CERT, 'utf8');
    const credentials = { key, cert };

    server = https.createServer(credentials, app);
} else {
    server = http.createServer(app);
}

app.use(cors());

app.get('/', (req, res, next) => res.send('ok'));

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log('clients: ', wss.clients);
        wss.clients.forEach((client) => client.send(msg));
    });
});

server.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
