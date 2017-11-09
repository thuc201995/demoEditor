import EditorReducer from  "../reducers/EditorReducer";
import {combineReducers} from "redux";

const allReducers=combineReducers({
    EditorReducer: EditorReducer
})

export default allReducers;