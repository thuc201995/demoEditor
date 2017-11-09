import {Editor,EditorState, RichUtils,AtomicBlockUtils} from 'draft-js';
import React,{Component} from 'react';
import BlockTypeContainer from '../containers/BlockTypeContainer';
import InlineStyleContainer from "../containers/InlineStyleContainer";
import MediaContainer from "../containers/MediaContainer";


class TextEditor extends Component{
    constructor(props){
        super(props);
        this.state={
            showURLInput: false,
            urlValue:""
        }
    }

    addImage=()=>{
        this.setState({
            showURLInput:true,

        })
    }
    updateEditor=(e)=>{
        this.props.onSaveEditorState(e)
    }
    onURLChange=(e)=>{
        const {name,value}= e.target;
        this.setState({[name]: value});
    }
    confirmMedia=()=>{
        this.props.InsertImage(this.state.urlValue);
        this.setState({
            showURLInput:false,
            urlValue:""
        })
    }
    render(){

        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div>
                    <input
                        onChange={this.onURLChange}
                        name="urlValue"
                        type="text"
                        value={this.state.urlValue}
                    />
                    <button onMouseDown={this.confirmMedia}>
                        Confirm
                    </button>
                </div>;
        }
        return(
            <div>
                <InlineStyleContainer/>
                <BlockTypeContainer/>
                <button onMouseDown={this.addImage} style={{marginRight: 10}}>
                    Add Image
                </button>
                {urlInput}
                <Editor
                    editorState={this.props.EditorReducer.editorState}
                    onChange={this.updateEditor}
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                />
            </div>

        )
    }
}
function mediaBlockRenderer(block) {

    if (block.getType() === 'atomic') {
        return {
            component: MediaContainer,
            editable: false,
        };
    }
    return null;
}

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'left':
            return 'align-left';
        case 'center':
            return 'align-center';
        case 'right':
            return 'align-right';
        default:
            return null;
    }
}
export default TextEditor;