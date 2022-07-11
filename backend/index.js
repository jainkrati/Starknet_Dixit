const Express=require('express');

let app = Express();
let port = 3001; 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
