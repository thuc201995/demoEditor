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
            urlValue:"",
        }
    }

    addImage=()=>{
        this.setState({
            showURLInput:true,
            cancel:true
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
            urlValue:"",
        })


    }
    closeMediaForm=()=>{
        this.setState({
            showURLInput:false
        })
    }
    render(){

        let urlInput;
            urlInput =
            <div className="image-modal" visibility="none">
                <div className="image-modal-header">
                    <span className="image-modal-header-option">URL
                        <span className="image-modal-header-label rdw-image-modal-header-label-highlighted"></span>
                    </span>

                </div>
                <div className="rimage-modal-url-section">
                    <input className="image-modal-url-input"
                           onChange={this.onURLChange}
                           name="urlValue"
                           type="text"
                           value={this.state.urlValue}
                    />
                </div>
                <span className="image-modal-btn-section">
                        <button className="image-modal-btn" onClick={this.confirmMedia}>Add</button>
                        <button className="image-modal-btn" onClick={this.closeMediaForm}>Cancel</button>
                    </span>
            </div>


        return(
            <div>
                <div className="editor-toolbar ">
                    <InlineStyleContainer/>
                    <BlockTypeContainer/>
                    <div onMouseDown={this.addImage} style={{marginRight: 10}} className="option-wrapper">
                        <img src="./images/image.svg" alt=""/>
                        {this.state.showURLInput ? urlInput:""}

                    </div>
                </div>
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
        case '':
            return 'align-right';
        default:
            return null;
    }
}
export default TextEditor;