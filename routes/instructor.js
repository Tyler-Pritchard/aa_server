const Instructor = require("../models/Instructor");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newInstructor = new Instructor(req.body)

    try {
        const savedInstructor = await newInstructor.save();
        res.status(200).json(savedInstructor);
    } catch {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
            }, 
            {new: true}
        );
        res.status(200).json(updatedInstructor);
    } catch(err) {
        res.status(500).json(err);
    };
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Instructor.findByIdAndDelete(req.params.id);
      res.status(200).json("Instructor Deleted");
    } catch(err) {
      res.status(500).json(err);
    }
});

//GET INSTRUCTOR
router.get("/find/:id", async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id);
      res.status(200).json(instructor);
    } catch(err) {
      res.status(500).json(err);
    };
});
  
//GET ALL INSTRUCTORS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let instructors;

        if (qNew) {
            instructors = await Instructor.find().sort({createdAt: -1}).limit(5);
        } else if (qCategory) {
            instructors = await Instructor.find({categories:{
                $in: [qCategory],
            }, 
        });
        } else {
            instructors = await Instructor.find();
        }
    
        res.status(200).json(instructors);
    } catch(err) {
      res.status(500).json(err);
    };
});

module.exports = router;