import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth from '../Auth';

function Header(props) {
  const signOut = () => {
    auth.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        JollofJS Documentation App
      </Link>
      {
        !auth.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth.signIn}>Sign In</button>
      }
      {
        auth.isAuthenticated() &&
        <div>
          <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(Header);
