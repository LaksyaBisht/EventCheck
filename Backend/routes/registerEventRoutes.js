const express = require('express');
const router = express.Router();
const registerEventController = require('../controllers/registerEventController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post("/register-event/:event_name", authenticateJWT, registerEventController.registerEvent);
module.exports = router;