const Tasks = require("../model/tasks");
const asyncWrapper = require('../middleware/async')




// get all the tasks
const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Tasks.find();
    res.status(200).json({ numOftasks: tasks.length, tasks });
 
});




// get a single task -req.params
const getTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
 
    const task = await Tasks.findOne({ _id: taskId });
    if (!taskId) {
      return res.status(404).json({ msg: `Task with the id: ${taskId}` });
    }
    res.status(200).json({ task });
 
});



// create task-  req.body - title, priority, completed
const createTask = asyncWrapper(async (req, res) => {
    const { title, priority } = req.body;
    if (!title || !priority) {
      return res
        .status(400)
        .json({ message: "please provide necessaryinformation" });
    }
    const task = await Tasks.create(req.body);
    res.status(200).json({ message: "task created", task });
});



// update
const updateTask = asyncWrapper(async (req, res) => {
    const { taskId } = req.params;
 
    const task = await Tasks.findOneAndUpdate({ _id: taskId}, req.body, {new:true, runValidators:true});
    if (!task) {
      return res.status(404).json({ message: "update not found" });
    }
    res.status(200).json({ messsage: "task updated" });
});




// delete
const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
    const task = await Tasks.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ messsage: "task deleted" });
});

// export
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
