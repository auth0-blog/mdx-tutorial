import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import shortid from "shortid";
import Nav from "../Nav/Nav";
import './style.css';

class Page extends Component {

    constructor(props){
      super(props);
      this.state = {
        components: [],
        refresh: true
      }
    }

    async addComponent(name){
      import(`../markdown/${name}.mdx`)
        .then(component =>
          this.setState({
            components: this.state.components.concat(component.default)
          })
        )
        .catch(() => {
          console.error(`"${name}" not yet supported`);
        });
    }

    static capitalize(text){
        return text.substr(0, 1).toUpperCase() + text.substr(1);
    }

    async componentDidMount() {
        await this.addComponent(Page.capitalize(this.props.match.params.page));
    }

    render() {
        const componentsElements = this.state.components.map(Component => (
          <Component key={shortid.generate()} />
        ));

        console.log("ComponentsElements", componentsElements);

        return (
            <div className="container">
                <div>
                    <Nav />
                    <div className="content">
                        {componentsElements}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Page);