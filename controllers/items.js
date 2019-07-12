var Item = require('../models/item');

module.exports = {
  create,
  itemCount
};

async function create(req, res) {
  console.log('user: ', req.user)
  try {
    // await Item.create(req.body);
    // Use the highScores action to return the list
    itemCount(req, res);
  } catch (err) {
    res.json({err});
  }
}

async function itemCount(req, res) {
//   const items = await Item.find({})
    // .sort({numGuesses: 1, seconds: 1})
    // // Default to a limit of 20 high scores
    // // if not specified in a query string
    // .limit(req.query.limit || 20);
  res.json({itemName: 'Pencil'});
}

