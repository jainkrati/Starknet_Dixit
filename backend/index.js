const Express = require('express');
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser'); 

let app = Express();
let port = 3001; 

let lobbies = {};

app.use(bodyParser.json());

app.post('/lobby', (req, res) => {
  let user_id=req.body.user_id;
  let lobby_id = req.body.lobby_id;
  if(!lobbies[lobby_id]){
    lobbies[lobby_id] = {
      users: [user_id]
    }
  } else {
    lobbies[lobby_id].users.push(user_id);
  }
  res.send({
    lobby_id
  });
});

app.get('/lobby', (req, res) => {
  let lobby_id = req.query.lobby_id;
  let lobby_obj = lobbies[lobby_id];
  res.send({
    lobby_obj
  });
});

app.post('/start', (req, res) => {
  let user_id = req.body.user_id;
  let lobby_id = req.body.lobby_id;
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj || lobby_obj.users[0]!=user_id) {
    res.send({
      "error": true,
      "message": "Invalid lobby"
    });
    return;
  }
  lobbies[lobby_id].status = "start";
  lobbies[lobby_id].nominated_user_id = lobbies[lobby_id].users[0];
  res.send({
    nominated_user_id: lobbies[lobby_id].nominated_user_id
  })
})

app.get('/cards', (req, res) => {
  // card distribution logic.
})

app.post('/round/start', (req, res) => {
  let user_id = req.body.user_id;
  let lobby_id = req.body.lobby_id;
  let card_id = req.body.card_id;
  let round_description = req.body.round_description;
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj || lobby_obj.status !== "start") {
    res.send({
      "error": true,
      "message": "Invalid game state"
    });
    return;
  }
  if(user_id !== lobby_obj.nominated_user_id) {
    res.send({
      "error": true,
      "message": "Invalid nominated player"
    });
    return;
  }
  lobbies[lobby_id].status = "nominated";
  lobbies[lobby_id].current_round.player_card_mapping[user_id] = card_id;
  lobbies[lobby_id].current_round.round_description = round_description;
})

app.get('/round/status', (req, res) => {
  let lobby_id = req.query;
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj || lobby_obj.status !== "nominated") {
    res.send({
      "error": true,
      "message": "Invalid game state or no description added"
    });
    return;
  }
  let round_description = lobby_obj.current_round.round_description;
  res.send({
    round_description,
    guesses_count: Object.keys(lobby_obj.current_round.player_card_mapping)
  })
});

app.post('/round/guess', (req, res) => {
  let user_id = req.body.user_id;
  let lobby_id = req.body.lobby_id;
  let card_id = req.body.card_id;
  let lobby_obj = lobbies[lobby_id];
  if(!lobby_obj) {
    res.send({
      "error": true,
      "message": "Invalid lobby"
    });
    return;
  }
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
  lobbies[lobby_id].current_round.player_card_mapping[user_id] = card_id;
  res.send({
    "status": "success"
  })
})

// Voting based on card ID and scoring based on user_id.

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
