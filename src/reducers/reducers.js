import { SET_CURRENT_TAG, RECEIVE_PHOTOS_FOR_TAG_NAME, RECEIVE_ERROR_MESSAGE } from '../actions/actionTypes';

const initialState = {
	currentTag: '',
	photos: {},
	error: null
};

function receiveErrorMessage(state, action) {
    return Object.assign({}, state, {
        error: action.error
    });
}

function receivePhotosForTagName(state, action) {
    var dataCopy = state.photos;

    //if it's a new search result then start fresh
    if (!dataCopy.hasOwnProperty(state.currentTag)) {
        dataCopy = {};
    	dataCopy[state.currentTag] = {};
    }

    dataCopy[state.currentTag].total = action.total;
    dataCopy[state.currentTag].hasNextPage = action.hasNextPage;
    dataCopy[state.currentTag][action.page] = action.photoList;

	//set the error object to be null
    return Object.assign({}, state, {
        error: null,
        photos: dataCopy
    });
}

function setCurrentTag(state, action) {
    return Object.assign({}, state, {
        currentTag: action.newTag
    });
}

export function appReducer(state = initialState, action) {
    switch(action.type) {
		case RECEIVE_PHOTOS_FOR_TAG_NAME: return receivePhotosForTagName(state, action);
		case RECEIVE_ERROR_MESSAGE: return receiveErrorMessage(state, action);
        case SET_CURRENT_TAG: return setCurrentTag(state, action);
        default : return state;
    }
}