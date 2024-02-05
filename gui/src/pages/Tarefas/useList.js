import { useState } from 'react';
import _ from 'lodash';

import { useUser } from '../../context/UserStore';
import API from '../../services/connection';

export default () => {
  const { loggedInUser } = useUser();
  const [value, setValue] = useState(0);
  const [loadingList, setLoadingList] = useState(true);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(undefined);
  const [idListToEdit, setIdListToEdit] = useState('');
  const [newList, setNewList] = useState(false);
  const [editListText, setEditListText] = useState('');

  const cancelNewList = () => {
    setNewList(false);
    setEditListText('');
    setIdListToEdit('');
  };

  const getLists = async () => {
    setLoadingList(true);
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
      setLoadingList(false);
    }
  };

  const saveList = async (listText) => {
    const payload = {
      name: listText,
    };
    try {
      if (idListToEdit) {
        await API.put(`/lists/${_.get(selectedList, '_id')}/`, payload, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
      } else {
        const { data } = await API.post('/lists/', payload, {
          headers: {
            Authorization: `${_.get(loggedInUser, 'apiKey')}`,
          },
        });
        setSelectedList(data.response);
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

  const handleChangeList = (event, newValue) => {
    setSelectedList(lists[newValue]);
    setValue(newValue);
  };
  return {
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
  };
};
