import 'react-app-polyfill/ie11';
import React, { FC } from 'react';
import '@fortawesome/fontawesome-free/js/all';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from '../../store';

import './App.scss';
import Calls from '../Calls/Calls';

const App: FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Calls />
        </Route>
      </Switch>
      <ToastContainer style={{ fontSize: '16px' }} theme="dark" position="bottom-right" />
    </div>
  );
};

export default App;
