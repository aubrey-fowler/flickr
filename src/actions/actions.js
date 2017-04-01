// fetch polyfill for IE and Safari support
import 'whatwg-fetch';

import { checkStatus, parseJSON, getPhotoList } from './actionUtils';

import { SET_CURRENT_TAG, RECIEVE_PHOTOS_FOR_TAG_NAME } from './actionTypes';

export function setCurrentTag(newTag) {
    console.log('setCurrentTag - ', newTag);
    return {
        type: SET_CURRENT_TAG,
        newTag
    };
}

export function receivePhotosForTagName(photoList, tagName) {
    console.log(' receivePhotosForTagName - ', tagName, photoList);
    return {
        type: RECIEVE_PHOTOS_FOR_TAG_NAME,
        photoList,
        tagName
    }
}

export function searchPhotosByTagName(tagName) {
    console.log(' searchPhotosByTagName - ', tagName);
    return dispatch => {
        return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3b05b1c548a89c1fbcfffab7e3f9a5d3&tags=${tagName}&format=json&nojsoncallback=1&per_page=20`)
            .then(checkStatus)
            .then(parseJSON)
            .then(getPhotoList)
            .then(result => dispatch(receivePhotosForTagName(result, tagName)))
            .catch(error => console.log('request failed', error));  
    } 
}