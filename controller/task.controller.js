const Task = require("../model/Task");

const taskController = {};

taskController.creatTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const tasklist = await Task.find({}).select("-__v"); // -__v를 안보고 싶어서.
    res.status(200).json({ status: "ok", data: tasklist });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true } // findByIdAndUpdate를 사용할때 쓰는 옵션으로 사용 안하면 이전 값을 보이게 됨.
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "ok", data: updatedTask });
    // { new: true }을 사용해야 업데이트가 반영된 값을 받을 수 있음.
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "ok", data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
