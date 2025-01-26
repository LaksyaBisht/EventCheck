const Event = require('../models/eventModel'); // Assuming Mongoose model for events

const searchEvents = async (req, res) => {
  const query = req.query.q;

  try {
    const results = await Event.find({ event_name: new RegExp(query, 'i') });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const results = await Event.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

const getEventByName = async (req, res) => {
    const event_name = req.params.event_name;
  
    try {
      const result = await Event.findOne({ event_name });
      if (!result) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(result);
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: 'Error fetching event details' });
    }
  };
  

const createEvent = async (req, res) => {
  const eventData = req.body;

  try {
    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(200).json({ message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
};

const getAdminEvents = async(req, res)=>{
  const adminUsername = req.user.username;

  try{
    const events = await Event.find({created_by: adminUsername});
    if(!events || events.length == 0){
      return res.status(404).json({message: "No events found for this admin"});
    }

    res.status(200).json({
      message: "Events fetched successfully",
      data: events
    });
  }
  catch(error){
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

const deleteEvent = async(req, res)=>{
  try{
    const eventName = req.params.event_name;
    const event = await Event.findOneAndDelete({event_name: eventName});
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete event", error: error.message });
  }
};

module.exports = {
  searchEvents,
  getAllEvents,
  getEventByName,
  createEvent,
  getAdminEvents,
  deleteEvent
};
