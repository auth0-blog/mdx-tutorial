import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './Header/Header';
import Welcome from './Welcome/Welcome';
import Callback from './Callback';
import Page from "./Page/Page";
import GuardedRoute from './GuardedRoute/GuardedRoute';
import auth from './Auth';

class App extends Component {

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }


  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Welcome} />
        <Route exact path='/callback' component={Callback} />
        <GuardedRoute path='/page/:page' component={Page} />
      </div>
    );
  }
}

export default withRouter(App);
