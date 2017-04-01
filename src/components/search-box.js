import React from 'react';
import ControlledTextInput from './controlled-text-input'; 

class SearchBox extends React.Component {
    render() {
        return (
            <ControlledTextInput 
                value={this.props.currentTag} 
                placeholder={'Search Flickr...'} 
                onEnterKey={this.props.onSubmit} 
                setCurrentTag={this.props.setCurrentTag} />
        );
    }
}

SearchBox.propTypes = {
    currentTag: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    setCurrentTag: React.PropTypes.func.isRequired
};

export default SearchBox;