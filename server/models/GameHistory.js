const mongoose = require('mongoose');

gameHistorySchema = mongoose.Schema({
    timestamp: { type: Date, required: true },
    players: [{
        username: { type: String, required: true },
        hand: { type: [String], required: true },
        chipsChange: { type: Number }
      }],
    winner: { type: String, required: true },
    pot: { type: Number, required: true },
    summary: { type: String }
  });

  module.exports = mongoose.model('GameHistory', gameHistorySchema);

  /*
  
_id : 661f9e77c5c1c2b3a35e7a12
timestamp : 2025-04-28T20:15:00.000+00:00
players : Array (2)
    0: Object
      username : "pokerPro92"
      hand : Array (2)
        0: "10♠"
        1: "J♠"
      chipsChange : 250
    1: Object
      username : "luckyLily"
      hand : Array (2)
      0: "8♦"
      1: "9♦"
winner : "pokerPro92"
pot: 500
summary : "pokerPro92 wins with a straight"


_id : ObjectID('661fa001c5c1c2b3a35e7a13')
timestamp: 2025-04-27T18:45:00.000+00:00
players : Array (2)
    0: Object
      username : "pokerPro92"
      hand : Array (2)
        0: "A♦"
        1: "K♦"
      chipsChange : -300
    1: Object
      username : "luckyLily"
      hand : Array (2)
        0: "Q♣"
        1: "Q♠"
      chipsChange : 300
winner : "luckyLily"
pot : 600
summary :"luckyLily wins with a pair of Queens"


_id : ObjectId('661fa045c5c1c2b3a35e7a14')
timestamp : 2025-04-26T22:10:00.000+00:00
players : Array (2)
    0: Object
      username : "bluffKing"
      hand : Array (2)
        0 : "2♣"
        1 : "7♦"
      chipsChange : 1000
    1 : Object
      username : "bluffKing"
      hand : Array (2)
        0 : "K♠"
        1 : "K♥"
      chipsChange : -1000
winner : "bluffKing"
pot : 2000
summary : "bluffKing wins with a bluff; opponent folded"
  */