import React from 'react';
import SearchBox from './components/search-box';
import SearchResults from './components/search-results';
import { connect } from 'react-redux';
import { setCurrentTag, searchPhotosByTagName, onInfiniteLoad } from '../src/actions/actions';

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
                    <SearchResults 
                        currentTag={this.props.currentTag} 
                        hasNextPage={this.props.hasNextPage}
                        totalNumResults={this.props.currentTagTotal}
                        onInfiniteLoad={this.props.onInfiniteLoad}
                        isInfiniteLoading={this.props.isInfiniteLoading} 
                        list={this.props.photos} />
                    ) : (
                    <p>{'Error: '}{this.props.error.message}</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const currentTag = store.currentTag;
    let photos = null;

    if (store.photos[currentTag] != null) {
        photos = [];
        Object.keys(store.photos[currentTag]).forEach(function(key) {
            if (!isNaN(parseInt(key, 10))) {
                photos = photos.concat(store.photos[currentTag][key]);
            }
        });
    }

    const total = store.photos[currentTag] == null ? 0 : store.photos[currentTag].total;
    const hasNextPage = store.photos[currentTag] == null ? false : store.photos[currentTag].hasNextPage;

    return { 
        currentTag: currentTag,
        error: store.error,
        photos: photos,
        hasNextPage: hasNextPage,
        currentTagTotal: total,
        isInfiniteLoading: store.isInfiniteLoading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTag: (newTag) => {
            dispatch(setCurrentTag(newTag));
        },
        searchPhotosByTagName: () => {
            dispatch(searchPhotosByTagName());
        },
        onInfiniteLoad: (nextPageNum) => {
            dispatch(onInfiniteLoad(nextPageNum));
        }
    };
}

App.propTypes = {
    currentTag: React.PropTypes.string.isRequired,
    error: React.PropTypes.object,
    photos: React.PropTypes.array,
    hasNextPage: React.PropTypes.bool.isRequired,
    setCurrentTag: React.PropTypes.func.isRequired,
    searchPhotosByTagName: React.PropTypes.func.isRequired
};

App.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
