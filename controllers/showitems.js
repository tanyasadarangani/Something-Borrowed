var Item = require('../models/item');

module.exports = {
  returned,
  create,
  itemCount
};

async function returned(req, res) {
  console.log(req.body);
  try {
    // how to get item ID out of req and remove from database?
    //let id = req.body._id;
    let item = req.body; // ?
    await item.remove(); // built in mongo command to remove item?

    res.json({ "ok": "ok" });
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



async function getItems(req, res) {
    const items = await Item.findAll();
    res.send(items);
}
