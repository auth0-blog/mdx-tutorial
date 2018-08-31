import React, {Component} from 'react';
import auth0Client from '../Auth';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">Welcome to the Jollof JS Framework</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
