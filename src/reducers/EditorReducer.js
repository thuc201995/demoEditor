import * as EditorAction from "../actions/EditorActionType";
import { EditorState,RichUtils,AtomicBlockUtils } from 'draft-js';

const defaultState={
    editorState: EditorState.createEmpty(),
};

const EditorReducer=(state=defaultState,action)=>{
    switch (action.type) {
        case EditorAction.UPDATE_EDITOR_STATE:
            return {
                ...state,
                editorState:action.payload
            };
            break;
        case EditorAction.TOOGLE_BLOCK_TYPE:
            return {
                editorState:RichUtils.toggleBlockType(state.editorState, action.payload)
            };
            break;
        case EditorAction.TOOGLE_INLINE_STYLE:
            return {
                editorState:RichUtils.toggleInlineStyle(state.editorState, action.payload)
            };
        case EditorAction.TOOGLE_ALIGN_TYPE:
            return {
                editorState:RichUtils.toggleBlockType(state.editorState, action.payload)
            };
            break;
        case EditorAction.INSERT_IMAGE:
            const contentState = state.editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'image',
                'IMMUTABLE',
                {src: action.payload}
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(
                state.editorState,
                {currentContent: contentStateWithEntity}
            );

            return {
                editorState: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    ' '
                )
            }
            break;
            case EditorAction.ALINGMENT_IMAGE:
       
                action.payload.contentState.mergeEntityData(
                      action.payload.block,
                     {alignment: action.payload.alignment} ,
                );
                return{
                    editorState:EditorState.push(state.editorState, action.payload.contentState, 'change-block-data')
                }
                break;
        default:
            return state;
            break;
    }
}

export default EditorReducer;