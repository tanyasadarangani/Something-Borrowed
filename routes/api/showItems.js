const express = require('express');
const router = express.Router();
const showItemsCtrl = require('../../controllers/showItems');

router.get('/', showItemsCtrl.getItems);
// Public Route
router.post('/returned', showItemsCtrl.returned);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
// router.post('/', checkAuth, scoresCtrl.create);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;