import {connect} from 'react-redux';
import {SaveEditorState,InsertImage} from '../actions/EditorAction';
import TextEditor from '../components/TextEditor';

let mapStateToProps=(state)=>{
    return {
        EditorReducer: state.EditorReducer
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        onSaveEditorState:(payload)=>{
            dispatch(SaveEditorState(payload));
        },
        InsertImage:(payload)=>{
            dispatch(InsertImage(payload));
        }
    }
}

let EditorPage=connect(mapStateToProps,mapDispatchToProps)(TextEditor);

export default EditorPage;