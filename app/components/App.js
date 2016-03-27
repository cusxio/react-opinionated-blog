import { Component, Children, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.element.isRequired,
};

export default class App extends Component {
    render() {
        const { children } = this.props;
        return Children.only(children);
    }
}

App.propTypes = propTypes;
