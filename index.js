import path from 'path';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 5124;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  const file = path.join(path.resolve(), '/public', '/index.html');
  return res.sendFile(file);
});

const idToItemMap = new Map();

app.get('/:shareId', (req, res) => {
  console.log(`GET HTTP method on /${req.params.shareId} resource!`);
  return res.send(idToItemMap.get(req.params.shareId));
})

app.post('/:shareId', (req, res) => {
  idToItemMap.set(req.params.shareId, req.query.v);
  console.log(`POST HTTP method on /${req.params.shareId} resource!`);
  console.log(idToItemMap);
  return res.send(`POSTED ${req.query.v} to ${req.params.shareId}`);
})

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`);
});