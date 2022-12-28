const Event = require("../models/Event");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newEvent = new Event(req.body)

    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
            }, 
            {new: true}
        );
        res.status(200).json(updatedEvent);
    } catch(err) {
        res.status(500).json(err);
    };
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json("Event Deleted");
    } catch(err) {
      res.status(500).json(err);
    }
});

//GET EVENT
router.get("/find/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.status(200).json(event);
    } catch(err) {
      res.status(500).json(err);
    };
});
  
//GET ALL EVENTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let events;

        if (qNew) {
            events = await Event.find().sort({createdAt: -1}).limit(5);
        } else if (qCategory) {
            events = await Event.find({categories:{
                $in: [qCategory],
            }, 
        });
        } else {
            events = await Event.find();
        }
    
        res.status(200).json(events);
    } catch(err) {
      res.status(500).json(err);
    };
});

module.exports = router;