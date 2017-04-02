// fetch polyfill for IE and Safari support
import 'whatwg-fetch';

import { API_KEY, NUM_PHOTOS_PER_PAGE } from '../constants/constants';
import { checkStatus, parseJSON, getPhotoResults } from './actionUtils';

import { 
    SET_CURRENT_TAG, 
    RECIEVE_PHOTOS_FOR_TAG_NAME,
    RECIEVE_ERROR_MESSAGE 
} from './actionTypes';

export function setCurrentTag(newTag) {
    return {
        type: SET_CURRENT_TAG,
        newTag
    };
}

export function receivePhotosForTagName(result, tagName) {
    return {
        type: RECIEVE_PHOTOS_FOR_TAG_NAME,
        photoList: result.photoList,
        page: result.page,
        tagName
    }
}

export function recieveErrorMessage(error) {   
    return {
        type: RECIEVE_ERROR_MESSAGE,
        error
    };
}

export function searchPhotosByTagName(tagName) {
    return dispatch => {
        if (tagName === '') {
            return dispatch(recieveErrorMessage(new Error('Invalid Tag Name Entered.')));
        } else {
            return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search` +
                `&api_key=${API_KEY}` +
                `&tags=${tagName}` +
                `&sort=date_upload` +
                `&extras=tags,date_taken,owner_name` +
                `&format=json` +
                `&nojsoncallback=1` +
                `&per_page=${NUM_PHOTOS_PER_PAGE}`)
                .then(checkStatus)
                .then(parseJSON)
                .then(getPhotoResults)
                .then(result => dispatch(receivePhotosForTagName(result, tagName)))
                .catch(error => dispatch(recieveErrorMessage(error)));  
        }
    } 
}