import {connect} from 'react-redux';
import {AlingmentImage} from '../actions/EditorAction';
import MediaType from "../components/MediaType";

let mapStateToProps=(state)=>{
    return {
        EditorReducer: state.EditorReducer
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        ImageAlingment:(contentState,alignment,block)=>{
            dispatch(AlingmentImage(contentState,alignment,block));
        }
    }
}

let MediaContainer=connect(mapStateToProps,mapDispatchToProps)(MediaType);

export default MediaContainer;