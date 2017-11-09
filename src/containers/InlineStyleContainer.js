import {connect} from 'react-redux';
import {InlineStyleToggle} from '../actions/EditorAction';
import InlineStyle from "../components/InlineStyle";

let mapStateToProps=(state)=>{
    return {
        EditorReducer: state.EditorReducer
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        ToggleInlineStyle:(payload)=>{
            dispatch(InlineStyleToggle(payload));
        }
    }
}

let InlineStyleContainer=connect(mapStateToProps,mapDispatchToProps)(InlineStyle);

export default InlineStyleContainer;