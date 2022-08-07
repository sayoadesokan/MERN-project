const asyncHandler = require("express-async-handler");

//@desc   Get goals
//@routes GET /api/goals
//@access Private goals
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get goals" });
});

//@desc   set goals
//@routes POST /api/goals
//@access Private goals
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("please enter a text");
  }

  res.status(200).json({ message: "Set goals" });
});

//@desc   Update goals
//@routes PUT /api/goals/:id
//@access Private goals
const UpdateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

//@desc  Delete goals
//@routes DELETE /api/goals/:id
//@access Private goals
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
};
