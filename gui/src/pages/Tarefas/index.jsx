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

import API from '../../services/connection';
import { useUser } from '../../context/UserStore';

function FormNewList ({value, showDelete, handlerDelete, handlerCancel, handlerSave}) {
  const [localValue, setLocalValue] = useState(value)
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
};

function FormNewTask({ title, description, handlerCancel, handlerSave }) {
  const [localTitle, setLocalTitle] = useState(title)
  const [localDescrption, setocalDescrption] = useState(description)
  return (
    <Grid style={{ margin:'10px' }} container spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end">
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
          autoFocus
          value={localDescrption}
          onChange={(e) => setocalDescrption(e.target.value)}
        />
      </Grid>
      <Grid xs="auto">
      <IconButton onClick={() => handlerSave(localTitle, localDescrption)} color="primary">
        <CheckCircleIcon />
      </IconButton>
      <IconButton onClick={() => handlerCancel()} color="primary">
        <CancelIcon />
      </IconButton>
      </Grid>
    </Grid>
  );
};


function Tarefa({ tarefa, handlerEdit, handlerDelete, handlerDone, color }) {
  const disabled = tarefa.status ? {opacity: 0.25} : {}
  return (
    <Grid style={{ paddingLeft: "10px", paddingRight: "10px",  backgroundColor: color ? 'rgba(196, 165, 116, 0.12)' : 'inherit' }} container spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      onDoubleClick={() => {
        handlerEdit(tarefa._id);
      }}>
      <Grid xs={10}>
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
          onChange={(e) => handlerDone(e.target.checked)}
        />
        <IconButton onClick={() => handlerDelete()} color="primary">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default function Tarefas() {
  const { loggedInUser } = useUser();
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [selectedList, setSelectedList] = useState('');
  const [idListToEdit, setIdListToEdit] = useState('');
  const [newList, setNewList] = useState(false);
  const [editListText, setEditListText] = useState('');

  const getLists = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('lists', {
        headers: {
          Authorization: `${_.get(loggedInUser, 'apiKey')}`,
        },
      });
      setLists(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };
  const getTasks = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const cancelNewList = () => {
    setNewList(false);
    setEditListText('');
    setIdListToEdit('');
  };

  const saveList = async (listText) => {
    const payload = {
      name: listText,
    };
    try {
      if (idListToEdit) {
        const { data } = await API.put(`/lists/${selectedList}/`, payload, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
        setSelectedList(data.response._id);
      } else {
        const { data } = await API.post('/lists/', payload, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
        setSelectedList(data.response._id);
        setValue(lists.length);
      }
      getLists();
    } catch (err) {
      console.warn(err);
    } finally {
      cancelNewList();
    }
  };

  const deleteList = async () => {
    try {
      if (idListToEdit) {
        await API.delete(`/lists/${idListToEdit}/`, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
        getLists();
        setValue(0);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      cancelNewList();
    }
  };



  const handleChange = (event, newValue) => {
    setSelectedList(lists[newValue]._id);
    setValue(newValue);
  };

  useEffect(() => {
    getLists();
    getTasks();
  }, []);

  const filterList = selectedList || _.get(lists, '[0]._id', '');

  const filteredTasks = _.filter(tasks, (task) => task.list._id === filterList);
  return (
    <div style={{ marginTop: '84px', paddingLeft: '10px', paddingRight: '10px' }}>
      <Box>
        <Paper>
          <Tabs value={newList ? -1 : value} onChange={handleChange}>
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
              return <FormNewList
                value={editListText}
                showDelete={!idListToEdit}
                handlerDelete={deleteList}
                handlerCancel={cancelNewList}
                handlerSave={saveList}
              />;
            })}
            {newList && !idListToEdit && <FormNewList />}
            {!newList && (
              <IconButton onClick={() => setNewList(true)} color="primary">
                <AddCircleIcon />
              </IconButton>
            )}
          </Tabs>
          {loading && (
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
          {!loading &&
            tasks.length > 0 &&
            _.map(filteredTasks, (task, index) => (
              <Tarefa tarefa={task} key={task._id} color={index % 2 === 0} />
            ))}
          <FormNewTask />
          <Button variant="contained" color="secondary" sx={{ width: '100%' }}>
            Nova tarefa
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
