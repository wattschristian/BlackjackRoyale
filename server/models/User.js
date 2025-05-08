const mongoose = require('mongoose');

userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  chips: { type: Number, default: 0 },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    highestWin: { type: Number, default: 0 },
    totalChipsWon: { type: Number, default: 0 }
  },
  chipHistory: { type: [Number], default: [] } // Add this field
});

module.exports = mongoose.model('User', userSchema);


/*  
_id: ObjectId('661fa0c1c5c1c2b3a35e7a21')
username : "pokerPro92"
passwordHash : "5f4dcc3b5aa765d61d8327deb882cf99"
chips : 1500
stats : Object
  gamesPlayed : 120
  gamesWon : 45
  highestWin : 5000
  totalChipsWon : 20000


_id: ObjectId('661fa0d8c5c1c2b3a35e7a22')
username : "luckyLily"
passwordHash : "e99a18c428cb38d5f260853678922e03"
chips : 3200
stats : Object
  gamesPlayed : 98
  gamesWon : 50
  highestWin : 4100
  totalChipsWon : 17000


_id: ObjectId('661fa0e9c5c1c2b3a35e7a23')
username : "bluffKing"
passwordHash : "d8578edf8458ce06fbc5bb76a58c5ca4"
chips : 800
stats : Object
  gamesPlayed : 65
  gamesWon : 15
  highestWin : 3000
  totalChipsWon : 8800
*/