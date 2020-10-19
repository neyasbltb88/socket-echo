let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let wss = expressWs.getWss();
let cors = require('cors');

const PORT = process.env.PORT || 8100;

app.use(cors());

app.get('/', (req, res, next) => res.send('ok'));

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => wss.clients.forEach((client) => client.send(msg)));
});

app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
