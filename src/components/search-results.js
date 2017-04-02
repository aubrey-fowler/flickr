import React from 'react';
import Infinite from 'react-infinite';
import FlickrSearchResult from './flickr-search-result'; 

class SearchResults extends React.Component {

    _handleInfiniteLoad() {
        console.log(' handle infinite load ');
    }

    render() {
        if (this.props.photos == null) {
            return null;
        }

        return (
            <Infinite 
                useWindowAsScrollContainer={true}
                containerHeight={window.height}
                elementHeight={200}
                elementWidth={400}
                infiniteLoadBeginEdgeOffset={200}
                onInfiniteLoad={this._handleInfiniteLoad}
                isInfiniteLoading={this.props.isInfiniteLoading}>
                    {this.props.photos['1'].map((item) => (
                        <FlickrSearchResult key={item.id} photo={item} />
                    ))}
            </Infinite>
        );
    }
}

SearchResults.propTypes = {
    isInfiniteLoading: React.PropTypes.bool.isRequired,
    photos: React.PropTypes.object
};

export default SearchResults;