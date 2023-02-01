const Tasks = require("../model/tasks");

// get all the tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ numOftasks: tasks.length, tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// get a single task -req.params
const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Tasks.findOne({ _id: taskId });
    if (!taskId) {
      return res.status(404).json({ msg: `Task with the id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// create task-  req.body - title, priority, completed
const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;
    if (!title || !priority) {
      return res
        .status(400)
        .json({ message: "please provide necessaryinformation" });
    }
    const task = await Tasks.create(req.body);
    res.status(200).json({ message: "task created", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// update
const updateTask = async (req, res) => {
    const { taskId } = req.params;
  try {
    const task = await Tasks.findOneAndUpdate({ _id: taskId}, req.body, {new:true, runValidators:true});
    if (!task) {
      return res.status(404).json({ message: "update not found" });
    }
    res.status(200).json({ messsage: "task updated" });


  }  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } 
};

// delete
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Tasks.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ messsage: "task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// export
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
