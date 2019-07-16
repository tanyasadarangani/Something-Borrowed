var Item = require('../models/item');

module.exports = {
  lendorborrow,
  create,
  itemCount
};

async function lendorborrow(req, res) {
  req.body.user = req.user;
  console.log("req.body: ",req.body);
  const item = new Item(req.body);
  console.log("req.user: ", req.user);
  try {
    await item.save();
    return res.json({ "ok": "ok" });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

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

