const registerEvents = require("../models/registerEventModel");

const registerEvent = async (req, res) => {
  const event_name = req.params.event_name;
  try {
    const { name, email, registrationNum, phone, teamDetails } = req.body;

    const newRegistration = new registerEvents({
      event_name,
      name,
      email,
      registrationNum,
      phone,
      teamDetails,
    });

    const savedRegistration = await newRegistration.save();
    res.status(201).json({
      message: "Registration successful",
      data: savedRegistration,
    });
  } catch (error) {
    console.error("Error while registering for the event:", error);
    res.status(500).json({
      message: "Failed to register for the event",
      error: error.message,
    });
  }
};

const getRegistrationsByEvent = async (req, res) => {
  const eventName = req.params.event_name;

  try {
    const students = await registerEvents.find({ event_name: eventName });

    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students registered for the event" });
    }

    res.status(200).json({
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const email = req.user.email;
    const events = await registerEvents.find({ email: email });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerEvent, getRegistrationsByEvent, getHistory};
