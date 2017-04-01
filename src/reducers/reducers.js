import { 
    SET_CURRENT_TAG
} from '../actions/actionTypes';

const initialState = {
	currentTag: ''
};

function setCurrentTag(state, action) {
    return Object.assign({}, state, {
        currentTag: action.newTag
    });
}

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_TAG: return setCurrentTag(state, action);
        default : return state;
    }
}