const express = require('express');
const router = express.Router();
const showItemsCtrl = require('../../controllers/showItems');
const auth = require('../../config/auth');

router.get('/', showItemsCtrl.getItems);
// Public Route
router.post('/returned', showItemsCtrl.returned);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
// router.use();
// router.post('/', checkAuth, scoresCtrl.create);
// router.get("/returnUserItems", checkAuth, (req,res) => {
//     console.log(req.user);
//     res.send(req.user);
})


/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;