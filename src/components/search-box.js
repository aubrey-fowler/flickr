import React from 'react';
import ControlledTextInput from './controlled-text-input'; 

class SearchBox extends React.Component {
    render() {
        return (
            <div>
                <ControlledTextInput 
                    value={this.props.currentTag} 
                    placeholder={'Search Flickr Tags...'} 
                    onEnterKey={this.props.onSubmit} 
                    setCurrentTag={this.props.setCurrentTag} />
                <input type="submit" value="Search" onClick={this.props.onSubmit} />
            </div>
        );
    }
}

SearchBox.propTypes = {
    currentTag: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    setCurrentTag: React.PropTypes.func.isRequired
};

export default SearchBox;