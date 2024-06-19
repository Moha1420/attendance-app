const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middlewares/auth');

// Middleware to authenticate user
router.use(auth);

// Check-in
router.post('/checkin', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().setHours(0, 0, 0, 0);
    const attendance = user.attendance.find(a => new Date(a.date).setHours(0, 0, 0, 0) === today);
    if (attendance) {
      return res.status(400).json({ msg: 'Already checked in today' });
    }
    user.attendance.push({ checkIn: new Date() });
    await user.save();
    res.json({ msg: 'Checked in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Check-out
router.post('/checkout', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().setHours(0, 0, 0, 0);
    const attendance = user.attendance.find(a => new Date(a.date).setHours(0, 0, 0, 0) === today);
    if (!attendance) {
      return res.status(400).json({ msg: 'Check-in first' });
    }
    if (attendance.checkOut) {
      return res.status(400).json({ msg: 'Already checked out today' });
    }
    attendance.checkOut = new Date();
    await user.save();
    res.json({ msg: 'Checked out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
