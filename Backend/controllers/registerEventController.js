const registerEvents = require('../models/registerEventModel');

const registerEvent = async(req, res)=>{
    const event_name = req.params.event_name;
    try{
        const {name, email, registrationNum, phone, teamDetails} = req.body;

        const newRegistration = new registerEvents({
            event_name,
            name,
            email,
            registrationNum, 
            phone,
            teamDetails
        });

        const savedRegistration = await newRegistration.save();
        res.status(201).json({
            message: "Registration successful",
            data: savedRegistration,
          });
    }
    catch (error) {
        console.error("Error while registering for the event:", error);
        res.status(500).json({
          message: "Failed to register for the event",
          error: error.message,
        });
      }
}

module.exports = {registerEvent}