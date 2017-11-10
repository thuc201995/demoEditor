import * as actionType from "./EditorActionType";

export const SaveEditorState=(editorState)=>{
    return {
        type:actionType.UPDATE_EDITOR_STATE,
        payload:editorState
    }
}

export const BlockTypeToggle=(blockType)=>{
    return {
        type: actionType.TOOGLE_BLOCK_TYPE,
        payload:blockType
    }
}

export const InlineStyleToggle=(inlineStyle)=>{
    return {
        type: actionType.TOOGLE_INLINE_STYLE,
        payload:inlineStyle
    }
}

export const InsertImage=(url)=>{
    return {
        type: actionType.INSERT_IMAGE,
        payload:url
    }
}

export const AlingmentImage=(contentState,alignment,block)=>{
    return {
        type: actionType.ALINGMENT_IMAGE,
        payload:{
            contentState:contentState,
            alignment:alignment,
            block:block,
          
        }
    }
}