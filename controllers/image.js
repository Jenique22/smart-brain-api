const Clarifai = require('clarifai');

 const app = new Clarifai.App({
 apiKey: '1c5eada058b14b3cb75b3b6ef0565938' 
});

const handleApiCall = (req, res) => {
  app.models
  
    .predict('a7ab2517c6e24364a479cd42d405e714', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}