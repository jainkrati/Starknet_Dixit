const Express = require('express');
const { v4: uuidv4 } = require('uuid');

let app = Express();
let port = 3001; 

let lobbies = {};

app.use(Express.bodyParser());

app.post('/lobby', (req, res) => {
  let user_id=req.body('user_id', null);
  let lobby_id = req.body('lobby_id',uuidv4());
  let lobby_obj = lobbies[lobby];
  if(!lobby_obj){
    lobby_obj = {
      users: [user_id]
    }
  } else {
    lobby_obj.users.push(user_id);
  }
  res.send({
    lobby_id
  });
});

app.post('/start', (req, res) => {
  let user_id = req.body('user_id', null);
  let lobby_id = req.body('lobby_id', null);
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj || lobby_obj.users[0]!=user_id) {
    res.send({
      "error": true,
      "message": "Invalid lobby"
    });
  }
  lobby_obj.status = "start";
  lobby_obj.nominated_user_id = lobby_obj.users[0];
  res.send({
    nominated_user_id: lobby_obj.nominated_user_id
  })
})

app.get('/cards', (req, res) => {
  // card distribution logic.
})

app.post('/round/start', (req, res) => {
  let user_id = req.body('user_id', null);
  let lobby_id = req.body('lobby_id', null);
  let card_id = req.body('card_id', null);
  let round_description = req.body('round_description', null);
  let lobby_obj = lobbies[lobby_id];
  if(lobby_obj.status !== "start") {
    res.send({
      "error": true,
      "message": "Invalid game state"
    });
  }
  if(user_id !== lobby_obj.nominated_user_id) {
    res.send({
      "error": true,
      "message": "Invalid nominated player"
    });
  }
  lobby_obj.status = "nominated";
  lobby_obj.current_round.player_card_mapping[user_id] = card_id;
  lobby_obj.current_round.round_description = round_description;
})

app.get('/round/status', (req, res) => {
  let lobby_id = req.query('lobby_id', null);
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj || lobby_obj.status !== "nominated") {
    res.send({
      "error": true,
      "message": "Invalid game state or no description added"
    });
  }
  let round_description = lobby_obj.current_round.round_description;
  res.send({
    round_description,
    guesses_count: Object.keys(lobby_obj.current_round.player_card_mapping)
  })
});

app.post('/round/guess', (req, res) => {
  let user_id = req.body('user_id', null);
  let lobby_id = req.body('lobby_id', null);
  let card_id = req.body('card_id', null);
  let lobby_obj = lobbies[lobby_id];
  if(lobby_obj.status !== "nominated") {
    res.send({
      "error": true,
      "message": "Invalid game state"
    });
  }
  if(lobby_obj.current_round.player_card_mapping[user_id]) {
    res.send({
      "error": true,
      "message": "player has already sumitted a card"
    });
  }
  lobby_obj.current_round.player_card_mapping[user_id] = card_id;
})

// Voting based on card ID and scoring based on user_id.

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
