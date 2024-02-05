/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

import useList from './useList';
import useTask from './useTask';

function FormNewList({ value, showDelete, handlerDelete, handlerCancel, handlerSave }) {
  const [localValue, setLocalValue] = useState(value);
  return (
    <div
      style={{
        display: 'inline-flex',
        verticalAlign: 'middle',
        borderBottomColor: '#131E3D',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
      }}
    >
      <TextField
        size="small"
        autoFocus
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <IconButton onClick={() => handlerSave(localValue)} color="primary">
        <CheckCircleIcon />
      </IconButton>
      <IconButton onClick={() => handlerCancel()} color="primary">
        <CancelIcon />
      </IconButton>
      {showDelete && (
        <IconButton onClick={() => handlerDelete()} color="primary">
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
}

function FormNewTask({ tarefa, handlerCancel, handlerSave }) {
  const [localTitle, setLocalTitle] = useState(tarefa.title);
  const [localDescrption, setLocalDescrption] = useState(tarefa.description);
  return (
    <Grid
      style={{ margin: '10px' }}
      container
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Grid xs>
        <TextField
          label="Titulo"
          size="small"
          fullWidth
          autoFocus
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
        />
      </Grid>
      <Grid xs={8}>
        <TextField
          label="Descrição"
          size="small"
          fullWidth
          value={localDescrption}
          onChange={(e) => setLocalDescrption(e.target.value)}
        />
      </Grid>
      <Grid xs="auto">
        <IconButton
          onClick={() =>
            handlerSave({
              ...tarefa,
              title: localTitle,
              description: localDescrption,
              status: tarefa.status,
              list: tarefa.list,
            })
          }
          color="primary"
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton onClick={() => handlerCancel()} color="primary">
          <CancelIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function Tarefa({ editing, tarefa, handlerEdit, handlerDelete, handlerDone, handlerClose, color }) {
  const disabled = tarefa.status ? { opacity: 0.25 } : {};
  return (
    <Grid
      style={{
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: color ? 'rgba(196, 165, 116, 0.12)' : 'inherit',
      }}
      container
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Grid
        xs={10}
        onDoubleClick={() => {
          handlerEdit(tarefa);
          handlerClose(true);
        }}
      >
        <Typography variant="h6" style={disabled}>
          {tarefa.title}
        </Typography>
        <Typography variant="body2" style={disabled}>
          {tarefa.description}
        </Typography>
      </Grid>
      <Grid xs="auto">
        <Checkbox
          checked={tarefa.status}
          onChange={(e) =>
            handlerDone({
              ...tarefa,
              status: e.target.checked,
            })
          }
          disabled={editing}
        />
        <IconButton onClick={() => handlerDelete(tarefa._id)} color="primary" disabled={editing}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default function Tarefas() {
  const {
    value,
    loadingList,
    lists,
    selectedList,
    idListToEdit,
    newList,
    editListText,
    handleChangeList,
    getLists,
    deleteList,
    saveList,
    cancelNewList,
    setEditListText,
    setIdListToEdit,
    setNewList,
  } = useList();
  const {
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
  } = useTask();

  useEffect(() => {
    getLists();
    getTasks();
  }, []);

  const filterList = selectedList || _.get(lists, '[0]', '');

  const filteredTasks = _.filter(tasks, (task) => task.list._id === filterList._id);
  return (
    <div style={{ marginTop: '84px', paddingLeft: '10px', paddingRight: '10px' }}>
      <Box>
        <Paper>
          <Tabs value={newList ? -1 : value} onChange={handleChangeList}>
            {_.map(lists, (list) => {
              if (list._id !== idListToEdit) {
                return (
                  <Tab
                    key={list._id}
                    label={list.name}
                    disabled={newList}
                    onDoubleClick={() => {
                      setEditListText(list.name);
                      setIdListToEdit(list._id);
                      setNewList(true);
                    }}
                  />
                );
              }
              return (
                <FormNewList
                  value={editListText}
                  showDelete={idListToEdit}
                  handlerDelete={deleteList}
                  handlerCancel={cancelNewList}
                  handlerSave={saveList}
                />
              );
            })}
            {newList && !idListToEdit && <FormNewList
              value={editListText}
              showDelete={false}
              handlerDelete={deleteList}
              handlerCancel={cancelNewList}
              handlerSave={saveList}
            />}
            {!newList && (
              <IconButton onClick={() => setNewList(true)} color="primary">
                <AddCircleIcon />
              </IconButton>
            )}
          </Tabs>
          {(loadingList || loadingTask) && (
            <div
              style={{
                paddingLeft: '50%',
                paddingRight: '50%',
                paddingTop: '10px',
                paddingBottom: '10px',
                width: '100%',
              }}
            >
              <CircularProgress />
            </div>
          )}
          {!loadingTask &&
            tasks.length > 0 &&
            _.map(filteredTasks, (task, index) => {
              if (task._id !== taskToEdit._id) {
                return (
                  <Tarefa
                    editing={newTask || newList}
                    tarefa={task}
                    key={task._id}
                    color={index % 2 === 0}
                    handlerDelete={deleteTask}
                    handlerDone={saveTask}
                    handlerEdit={setTaskToEdit}
                    handlerClose={setNewTask}
                  />
                );
              }
              return (
                <FormNewTask
                  tarefa={{
                    ...taskToEdit,
                    list: filterList,
                  }}
                  handlerCancel={cancelNewTask}
                  handlerSave={saveTask}
                />
              );
            })}
          {newTask && !taskToEdit._id && (
            <FormNewTask
              tarefa={{
                title: '',
                description: '',
                status: false,
                list: filterList,
              }}
              handlerCancel={cancelNewTask}
              handlerSave={saveTask}
            />
          )}
          {!newTask && !newList && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%' }}
              onClick={() => setNewTask(true)}
            >
              Nova tarefa
            </Button>
          )}
        </Paper>
      </Box>
    </div>
  );
}
