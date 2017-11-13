import {connect} from 'react-redux';
import {BlockTypeToggle} from '../actions/EditorAction';
import {AlignTypeToggle} from '../actions/EditorAction';
import ListStyle from "../components/ListStyle";
import {AignStyle} from "../components/ListStyle"
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


let ListStyleContainer=connect(mapStateToProps,mapDispatchToProps)(ListStyle);
export default ListStyleContainer;