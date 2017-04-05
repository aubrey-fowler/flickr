import React from 'react';
import '../styles/flickr-search-result.css';
import InfiniteScroll from 'react-infinite-scroller';
import FlickrSearchResult from './flickr-search-result'; 

class SearchResults extends React.Component {

    getFlickrSearchResultList() {
        let ari = [];
 
        for (let i = 0; i < this.props.list.length; i++) {
            ari.push(<FlickrSearchResult key={this.props.list[i].id} photo={this.props.list[i]} />);
        }

        return ari;
    }

    render() {       
        if (this.props.list == null || this.props.list.size === 0) {
            return null;
        }

        return (
            <div>
                <p>{this.props.totalNumResults}{' results for '}<b>{this.props.currentTag}</b>{'. Scroll down to see more.'}</p>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.onInfiniteLoad}
                    hasMore={this.props.hasNextPage}
                    loader={<div className="search_result_container">{'Loading ...'}</div>}>
                    {this.getFlickrSearchResultList()}
                </InfiniteScroll>
            </div>
        );
    }
}

SearchResults.propTypes = {
    hasNextPage: React.PropTypes.bool.isRequired,
    currentTag: React.PropTypes.string.isRequired,
    totalNumResults: React.PropTypes.number.isRequired,
    onInfiniteLoad: React.PropTypes.func.isRequired,
    list: React.PropTypes.array
};

export default SearchResults;