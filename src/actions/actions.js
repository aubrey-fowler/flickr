// fetch polyfill for IE and Safari support
import 'whatwg-fetch';

import { API_KEY, NUM_PHOTOS_PER_PAGE } from '../constants/constants';
import { checkStatus, parseJSON, getPhotoResults } from './actionUtils';
import { SET_CURRENT_TAG, RECEIVE_PHOTOS_FOR_TAG_NAME, RECEIVE_ERROR_MESSAGE } from './actionTypes';

export function setCurrentTag(newTag) {
    return {
        type: SET_CURRENT_TAG,
        newTag
    };
}

export function receivePhotosForTagName(result, tagName) {
    return {
        type: RECEIVE_PHOTOS_FOR_TAG_NAME,
        photoList: result.photoList,
        page: result.page,
        total: result.total,
        hasNextPage: result.hasNextPage,
        tagName
    }
}

export function receiveErrorMessage(error) {   
    return {
        type: RECEIVE_ERROR_MESSAGE,
        error
    };
}

export function onInfiniteLoad(nextPageNum) {
    return (dispatch, getState) => {
        const tag = getState().currentTag;
        const pgNum = nextPageNum + 1;
        return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search` +
            `&api_key=${API_KEY}` +
            `&tags=${tag}` +
            `&page=${pgNum}` +
            `&sort=date_upload` +
            `&extras=tags,date_taken,owner_name` +
            `&format=json` +
            `&nojsoncallback=1` +
            `&per_page=${NUM_PHOTOS_PER_PAGE}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(getPhotoResults)
            .then(result => dispatch(receivePhotosForTagName(result, tag)))
            .catch(error => dispatch(receiveErrorMessage(error)));  
    }
}

export function searchPhotosByTagName() {
    return (dispatch, getState) => {
        const tag = getState().currentTag;
        if (tag == null || tag === '') {
            return dispatch(receiveErrorMessage(new Error('No Tag Name Entered. Please enter a tag.')));
        } else {
            return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search` +
                `&api_key=${API_KEY}` +
                `&tags=${tag}` +
                `&sort=date_upload` +
                `&extras=tags,date_taken,owner_name` +
                `&format=json` +
                `&nojsoncallback=1` +
                `&per_page=${NUM_PHOTOS_PER_PAGE}`)
                .then(checkStatus)
                .then(parseJSON)
                .then(getPhotoResults)
                .then(result => dispatch(receivePhotosForTagName(result, tag)))
                .catch(error => dispatch(receiveErrorMessage(error)));  
        }
    } 
}