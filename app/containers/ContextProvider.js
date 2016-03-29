import { Component, PropTypes, Children } from 'react';

const childContextTypes = {
    layouts: PropTypes.object,
    pages: PropTypes.object,
};

const propTypes = {
    children: PropTypes.element.isRequired,
    layouts: PropTypes.object,
    pages: PropTypes.object,
};

export default class ContextProvider extends Component {
    getChildContext() {
        return {
            layouts: this.props.layouts,
            pages: this.props.pages,
        };
    }

    render() {
        const { children } = this.props;
        return Children.only(children);
    }
}

ContextProvider.childContextTypes = childContextTypes;
ContextProvider.propTypes = propTypes;
