const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc   Get goals
//@routes GET /api/goals
//@access Private goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

//@desc   set goals
//@routes POST /api/goals
//@access Private goals
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("please enter a text");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc   Update goals
//@routes PUT /api/goals/:id
//@access Private goals
const UpdateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc  Delete goals
//@routes DELETE /api/goals/:id
//@access Private goals
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal cannot be found to be deleted!");
  }

  await Goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
};
