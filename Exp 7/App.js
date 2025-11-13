const express = require('express');
const app = express();
app.use(express.json());

let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Spades', value: '10' },
  { id: 3, suit: 'Diamonds', value: 'K' }
];

const validSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const validValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

app.get('/cards', (req, res) => {
  res.json(cards);
});

app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send({ error: 'Card not found' });
  res.json(card);
});

app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send({ error: 'Suit and value required' });
  if (!validSuits.includes(suit) || !validValues.includes(value)) return res.status(400).send({ error: 'Invalid suit or value' });
  const newCard = { id: cards.length ? cards[cards.length - 1].id + 1 : 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send({ error: 'Card not found' });
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send({ error: 'Suit and value required' });
  if (!validSuits.includes(suit) || !validValues.includes(value)) return res.status(400).send({ error: 'Invalid suit or value' });
  card.suit = suit;
  card.value = value;
  res.json(card);
});

app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send({ error: 'Card not found' });
  const removed = cards.splice(index, 1)[0];
  res.json(removed);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
