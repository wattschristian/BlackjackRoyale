const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const GameHistoryModel = require('./models/GameHistory')
const UserModel = require('./models/User')

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use(express.json());  // For parsing JSON request bodies

const gameController = require('./controllers/gameController');
app.use('/', gameController);

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
mongoose.connect("mongodb+srv://cameronmeier:XljWY61FVTpW3kxX@cluster0.flhnso9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed')
})

async function seedUserData() {
    try {
      await UserModel.insertMany([
        {
          _id: '661fa0c1c5c1c2b3a35e7a21',
          username: 'pokerPro92',
          passwordHash: '5f4dcc3b5aa765d61d8327deb882cf99', // "password"
          chips: 1500,
          stats: {
            gamesPlayed: 120,
            gamesWon: 45,
            highestWin: 5000,
            totalChipsWon: 20000
          }
        },
        {
          _id: '661fa0d8c5c1c2b3a35e7a22',
          username: 'luckyLily',
          passwordHash: 'e99a18c428cb38d5f260853678922e03', // "abc123"
          chips: 1000,
          stats: {
            gamesPlayed: 0,
            gamesWon: 0,
            highestWin: 0,
            totalChipsWon: 0
          }
        },
        {
          _id: '661fa0e9c5c1c2b3a35e7a23',
          username: 'bluffKing',
          passwordHash: 'd8578edf8458ce06fbc5bb76a58c5ca4', // "qwerty"
          chips: 1000,
          stats: {
            gamesPlayed: 0,
            gamesWon: 0,
            highestWin: 0,
            totalChipsWon: 0
          }
        }
      ]);
  
      console.log('User data seeded');
    } catch (err) {
      console.error('Error seeding user data:', err);
    } finally {
      mongoose.connection.close();
    }
  }

async function seedGameHistoryData() {
    try {
      await GameHistoryModel.insertMany([
        {
          _id: '661f9e77c5c1c2b3a35e7a12',
          timestamp: new Date('2025-04-28T20:15:00.000Z'),
          players: [
            {
              username: 'pokerPro92',
              hand: ['10♠', 'J♠'],
              chipsChange: 250
            },
            {
              username: 'luckyLily',
              hand: ['8♦', '9♦']
            }
          ],
          winner: 'pokerPro92',
          pot: 500,
          summary: 'pokerPro92 wins with a straight'
        },
        {
          _id: '661fa001c5c1c2b3a35e7a13',
          timestamp: new Date('2025-04-27T18:45:00.000Z'),
          players: [
            {
              username: 'pokerPro92',
              hand: ['A♦', 'K♦'],
              chipsChange: -300
            },
            {
              username: 'luckyLily',
              hand: ['Q♣', 'Q♠'],
              chipsChange: 300
            }
          ],
          winner: 'luckyLily',
          pot: 600,
          summary: 'luckyLily wins with a pair of Queens'
        },
        {
          _id: '661fa045c5c1c2b3a35e7a14',
          timestamp: new Date('2025-04-26T22:10:00.000Z'),
          players: [
            {
              username: 'bluffKing',
              hand: ['2♣', '7♦'],
              chipsChange: 1000
            },
            {
              username: 'bluffKing',
              hand: ['K♠', 'K♥'],
              chipsChange: -1000
            }
          ],
          winner: 'bluffKing',
          pot: 2000,
          summary: 'bluffKing wins with a bluff; opponent folded'
        }
      ]);
  
      console.log('Game history data seeded');
    } catch (err) {
      console.error('Error seeding game history:', err);
    } finally {
      mongoose.connection.close();
    }
  }

// Stats endpoint
app.get('/stats', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('Stats requested for user ID:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const user = await UserModel.findById(userId);
    console.log('User found:', user ? user.username : 'Not found');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Calculate win rate
    const winRate = user.stats.gamesPlayed > 0 
      ? ((user.stats.gamesWon / user.stats.gamesPlayed) * 100).toFixed(2) 
      : '0.00';
    
    const stats = {
      gamesPlayed: user.stats.gamesPlayed,
      gamesWon: user.stats.gamesWon,
      winRate: winRate,
      chips: user.chips,
      chipHistory: user.chipHistory || []
    };
    
    console.log('Sending stats:', stats);
    res.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
