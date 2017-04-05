import React from 'react';
import '../styles/flickr-search-result.css';

/*
    Each search result should include: 
        a thumbnail, 
        a link to the photo on flickr.com, 
        the title, 
        the tags, 
        the owner and
        the date it was taken.
        https://farm${farm-id}.staticflickr.com/${server-id}/${id}_${secret}_t.jpg
        https://www.flickr.com/photos/${user-id}/${photo-id}
*/

class FlickrSearchResult extends React.Component {
    render() {
        const { photo } = this.props;

        const imgSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
        const linkSrc = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

        return (
            <div className="search_result_container">
                <img src={imgSrc} alt={"https://www.flickr.com/"} />
                <div>
                    Title: <a href={linkSrc} target="_blank">{photo.title === '' ? 'Flickr' : photo.title}</a><br/>
                    Owner: {photo.ownername}<br/>
                    Date Taken: {photo.datetaken}
                </div>
                <footer>Tags: {photo.tags}</footer>
            </div>
        );
    }
}

FlickrSearchResult.propTypes = {
    photo: React.PropTypes.object.isRequired
};

export default FlickrSearchResult;