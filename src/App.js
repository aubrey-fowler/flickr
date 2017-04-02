import React from 'react';
import SearchBox from './components/search-box';
import SearchResults from './components/search-results';
import { connect } from 'react-redux';
import { setCurrentTag, searchPhotosByTagName } from '../src/actions/actions';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Flickr Photos</h1>
                <SearchBox 
                    currentTag={this.props.currentTag} 
                    setCurrentTag={this.props.setCurrentTag}
                    onSubmit={this.props.searchPhotosByTagName} />
                {this.props.error == null ? (
                    <SearchResults isInfiniteLoading={false} photos={this.props.photos} />
                    ) : (
                    <p>{'Error: '}{this.props.error.message}</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return { 
        currentTag: store.currentTag,
        photos: store.photos[store.currentTag],
        error: store.error
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
    error: React.PropTypes.object,
    photos: React.PropTypes.object,
    setCurrentTag: React.PropTypes.func.isRequired,
    searchPhotosByTagName: React.PropTypes.func.isRequired
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
