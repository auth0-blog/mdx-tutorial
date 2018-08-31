import React, { Component } from 'react';
import {Route, Router} from 'react-router-dom';
import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import Callback from './Callback';
import Page from "./Page/Page";
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Welcome} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/page/:page' component={Page} />
      </div>
    );
  }
}

export default App;
