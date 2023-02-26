const express = require('express');
const router = express.Router();

// User dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
