import React from 'react';
import { ENTER_KEY } from '../constants/constants';

class ControlledTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this._handleBlur = this._handleBlur.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleKeyDown(event) {
        if (event.which === ENTER_KEY || event.keyCode === ENTER_KEY) {
            this.refs.textInput.blur();
            this.props.onEnterKey(event.target.value);
        }
    }

    _handleBlur(event) {
        this.props.setCurrentTag(event.target.value);
    }

    _handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <input 
                type="text" 
                ref="textInput"
                className={this.props.classNames}
                placeholder={this.props.placeholder}
                value={this.state.value} 
                onKeyDown={this._handleKeyDown}
                onBlur={this._handleBlur}
                onChange={this._handleChange} />
        );
    }
}

ControlledTextInput.propTypes = {
    value: React.PropTypes.string,
    classNames: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onEnterKey: React.PropTypes.func.isRequired,
    setCurrentTag: React.PropTypes.func.isRequired
};

ControlledTextInput.defaultProps = {
    value: '',
    classNames: '',
    placeholder: ''
};

export default ControlledTextInput;