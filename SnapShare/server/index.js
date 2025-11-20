const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Sample feed data
let feeds = [
  {
    id: '1',
    imageUrl: 'file:///mnt/data/3be2eb0b-3662-45cd-b618-487e8b42ef73.png', // your uploaded background
    caption: 'Beautiful Mandala',
    owner: 'User1',
  },
  {
    id: '2',
    imageUrl: 'https://placekitten.com/300/300',
    caption: 'Cute kitten',
    owner: 'User2',
  },
];

// GET all feeds
app.get('/api/feeds', (req, res) => {
  res.json(feeds);
});

// POST new feed
app.post('/api/feeds', (req, res) => {
  const { imageUrl, caption, owner } = req.body;
  if (!imageUrl || !caption || !owner) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newFeed = {
    id: (feeds.length + 1).toString(),
    imageUrl,
    caption,
    owner,
  };

  feeds.push(newFeed);
  res.status(201).json(newFeed);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
