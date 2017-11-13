import {connect} from 'react-redux';
import {AlignTypeToggle} from '../actions/EditorAction';
import AlignText from "../components/AlignText";

let mapStateToProps=(state)=>{
    return {
        EditorReducer: state.EditorReducer
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        ToggleAlignType:(payload)=>{
            dispatch(AlignTypeToggle(payload));
        }
    }
}

let AlignTextContainer=connect(mapStateToProps,mapDispatchToProps)(AlignText);

export default AlignTextContainer;