import React from 'react';
import SearchBox from './components/search-box';
import { connect } from 'react-redux';
import { setCurrentTag, searchPhotosByTagName } from '../src/actions/actions';

class App extends React.Component {
    render() {
        return (
            <div>
                <SearchBox 
                    currentTag={this.props.currentTag} 
                    setCurrentTag={this.props.setCurrentTag}
                    onSubmit={this.props.searchPhotosByTagName} />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return { 
        currentTag: store.currentTag
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTag: (newTag) => {
            dispatch(setCurrentTag(newTag));
        },
        searchPhotosByTagName: (tag) => {
            dispatch(searchPhotosByTagName(tag));
        }
    };
}

App.propTypes = {
    currentTag: React.PropTypes.string.isRequired,
    setCurrentTag: React.PropTypes.func.isRequired,
    searchPhotosByTagName: React.PropTypes.func.isRequired
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
