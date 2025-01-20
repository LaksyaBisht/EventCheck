const express = require('express');
const router = express.Router();
const registerEventController = require('../controllers/registerEventController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post("/register-event/:event_name", authenticateJWT, registerEventController.registerEvent);
router.get("/registrations/:event_name", authenticateJWT, registerEventController.getRegistrationsByEvent);

module.exports = router;