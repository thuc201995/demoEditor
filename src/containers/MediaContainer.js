import {connect} from 'react-redux';
import {BlockTypeToggle} from '../actions/EditorAction';
import MediaType from "../components/MediaType";

let mapStateToProps=(state)=>{
    return {
        EditorReducer: state.EditorReducer
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        ToggleBlockType:(payload)=>{
            dispatch(BlockTypeToggle(payload));
        }
    }
}

let MediaContainer=connect(mapStateToProps,mapDispatchToProps)(MediaType);

export default MediaContainer;