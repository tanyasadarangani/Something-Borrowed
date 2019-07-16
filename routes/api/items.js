const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/items');
const auth = require('../../config/auth');
const Items = require('../../models/item');


router.get('/', itemsCtrl.itemCount);
// Public Route
router.post('/lendorborrow', itemsCtrl.lendorborrow);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
// router.post('/', checkAuth, scoresCtrl.create);

router.get("/returnUserItems",auth, async (req,res) => {
  console.log(req.user.name);
  //find every item with the user name 
  const items = await Items.find({name:req.user.name})
  console.log(items);
  res.send(req.user);
})

//update route
router.post("/updateItems", auth, async (req,res)=>{
  //get the current items

  //retrieve the current information

  //update the current item with current information
})

//this route delete the item
router.delete("/:id", auth , async (req,res) => {

})
/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;