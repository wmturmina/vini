import { useState } from 'react';
import _ from 'lodash';

import { useUser } from '../../context/UserStore';
import API from '../../services/connection';

export default () => {
  const { loggedInUser } = useUser();
  const [loadingTask, setLoadingTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [newTask, setNewTask] = useState(false);

  const cancelNewTask = () => {
    setNewTask(false);
    setTaskToEdit({});
  };

  const getTasks = async () => {
    setLoadingTask(true);
    try {
      const { data } = await API.get('tasks', {
        headers: {
          Authorization: `${_.get(loggedInUser, 'apiKey')}`,
        },
      });
      setTasks(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoadingTask(false);
    }
  };

  const saveTask = async (taskObj) => {
    console.warn(taskObj);
    try {
      if (_.get(taskObj, '_id')) {
        await API.put(`/tasks/${_.get(taskObj, '_id')}/`, taskObj, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
      } else {
        await API.post('/tasks/', taskObj, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
      }
      getTasks();
    } catch (err) {
      console.warn(err);
    } finally {
      cancelNewTask();
    }
  };

  const deleteTask = async (taskToDelete) => {
    try {
      await API.delete(`/tasks/${taskToDelete}/`, {
        headers: {
          Authorization: `${_.get(loggedInUser, 'apiKey')}`,
        },
      });
      getTasks();
    } catch (err) {
      console.warn(err);
    } finally {
      cancelNewTask();
    }
  };

  return {
    loadingTask,
    tasks,
    taskToEdit,
    newTask,
    getTasks,
    deleteTask,
    saveTask,
    cancelNewTask,
    setTaskToEdit,
    setNewTask,
  };
};
