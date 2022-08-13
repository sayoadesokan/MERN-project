const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
} = require("../controllers/goalsController");

const { protect } = require("../middleWare/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, UpdateGoals).delete(protect, deleteGoals);

//TO REMEMBER
// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/:id", UpdateGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
