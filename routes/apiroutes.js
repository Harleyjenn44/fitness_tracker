const router = require("express").Router();
const Workout = require("../models/workouts.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err)
      });
  });
  
  router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
            let total = 0;
            workout.exercies.forEach((exercise) => {
             total += exercise.duration;
            });
        workout.totalDuration = total;
        });
        res.json(result);
    })
    .catch((err) => {
        res.status(404).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    Workout.find()
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, {
      $push: { exercises: req.body },
    })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err)
      });
  });
  
  module.exports = router;
  

