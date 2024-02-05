import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import _ from 'lodash';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from 'date-fns/locale';

import Tarefas from './pages/Tarefas';
import Login from './pages/Login';
import Navbar from './pages/NavBar';
import { useUser } from './context/UserStore';

function App() {
  const { loggedInUser } = useUser();
  const loggedIn = _.get(loggedInUser, 'loggedIn', false);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {loggedIn ? (
        <div>
          <Navbar />
          <div>
            <Routes>
              <Route path="/tarefas" element={<Tarefas />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </LocalizationProvider>
  );
}

export default App;
