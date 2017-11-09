import {connect} from 'react-redux';
import {BlockTypeToggle} from '../actions/EditorAction';
import BlockType from "../components/BlockType";

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

let BlockTypeContainer=connect(mapStateToProps,mapDispatchToProps)(BlockType);

export default BlockTypeContainer;