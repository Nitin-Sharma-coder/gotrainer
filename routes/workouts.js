const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//this will authenticate the user only then they will get here
router.use(requireAuth);

//GET all workouts
router.get("/", getWorkouts);

//GET a Single Workouts
router.get("/:id", getWorkout);

//POST a new Workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
