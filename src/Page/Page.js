import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import './style.css';

class Page extends Component {

    constructor(props){
      super(props);

      this.state = {
        Component: ''
      }
    }

    async addComponent(name){
      import(`../markdown/${name}.mdx`)
        .then(component =>
          this.setState({
            Component: component.default
          })
        )
        .catch(() => {
          this.setState({
            Component: ''
          })
        });
    }

    static capitalize(text){
      return text.substr(0, 1).toUpperCase() + text.substr(1);
    }

    async componentDidMount() {
      await this.addComponent(Page.capitalize(this.props.match.params.page));
    }

    async componentWillReceiveProps(nextProps) {
      await this.addComponent(Page.capitalize(nextProps.match.params.page));
    }

    render() {
        const { Component } = this.state;

        return (
            <div className="container">
                <div>
                    <Nav />
                    <div className="content">
                        { Component ? <Component /> : null }
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;