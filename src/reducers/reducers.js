import { 
    SET_CURRENT_TAG,
    RECIEVE_PHOTOS_FOR_TAG_NAME,
    RECIEVE_ERROR_MESSAGE
} from '../actions/actionTypes';

const initialState = {
	currentTag: '',
	photos: {},
	isInfiniteLoading: false,
	error: null
};

function recieveErrorMessage(state, action) {
    return Object.assign({}, state, {
        error: action.error
    });
}

function recievePhotosForTagName(state, action) {
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
		case RECIEVE_PHOTOS_FOR_TAG_NAME: return recievePhotosForTagName(state, action);
		case RECIEVE_ERROR_MESSAGE: return recieveErrorMessage(state, action);
        case SET_CURRENT_TAG: return setCurrentTag(state, action);
        default : return state;
    }
}