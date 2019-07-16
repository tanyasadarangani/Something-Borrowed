const express = require("express");
const router = express.Router();
const itemsCtrl = require("../../controllers/items");
const auth = require("../../config/auth");
const Items = require("../../models/item");

router.get("/", itemsCtrl.itemCount);
// Public Route
/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require("../../config/auth"));

router.post("/lendorborrow", checkAuth, itemsCtrl.lendorborrow);

// router.post('/', checkAuth, scoresCtrl.create);

router.get("/returnUserItems", checkAuth, (req, res) => {
  console.log(req.user);
  //find every item with the user name
  Items.find({ user: req.user })
    .then(items => res.json(items))
    .catch(err => res.status(400).json(err));
});

//update route
router.put("/:id", checkAuth, async (req, res) => {
  Items.findById(req.params.id)
    .then(async item => {
      item = Object.assign(item, req.body);
      await item.save();
      return res.json(item)
    })
    .catch(err => res.status(400).json(err));
});

//this route delete the item
router.delete("/:id", checkAuth, async (req, res) => {
  // Items.findById(req.params.id)
  //   .then(item => {

  //     return res.json(item)
  //   })
  //   .catch(err => res.status(400).json(err));
  Items.findByIdAndDelete(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json);
});
/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
