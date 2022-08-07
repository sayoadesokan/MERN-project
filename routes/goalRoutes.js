const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
} = require("../controllers/goalsController");

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(UpdateGoals).delete(deleteGoals);

//TO REMEMBER
// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/:id", UpdateGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
