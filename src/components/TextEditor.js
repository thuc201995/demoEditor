import {Editor,EditorState, RichUtils,AtomicBlockUtils} from 'draft-js';
import React,{Component} from 'react';
import BlockTypeContainer from '../containers/BlockTypeContainer';
import InlineStyleContainer from "../containers/InlineStyleContainer";
import MediaContainer from "../containers/MediaContainer";
import ListStyleContainer from "../containers/ListStyleContainer";
import AlignTextContainer from "../containers/AlignTextContainer";
import Immutable from "immutable";
import {convertToHTML} from 'draft-convert';
import {stateToHTML} from 'draft-js-export-html';

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
let options = {
    blockRenderers: {
      atomic: (block) => {
        let data = block.getData();
        if (data.get('foo') === 'bar') {
          return '<div>' + escape(block.getText()) + '</div>';
        }
      },
    },
  };
let html = stateToHTML(this.props.EditorReducer.editorState.getCurrentContent(),options);
        return(
            <div>
                <div className="editor-toolbar ">
                    <InlineStyleContainer/>
                    <BlockTypeContainer/>
                    <ListStyleContainer/>
                    <AlignTextContainer/>
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
                {<div>{html}</div>}
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
const blockRenderMap = Immutable.Map({
    'section': {
        element: 'section'
      },
    'unstyled': {
        element: 'p'
    },
    'STRIKETHROUGH': {
        textDecoration: 'line-through',
      },
  });
const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return 'superFancyBlockquote';
            break;
        case 'left':
            return 'align-left';
            break;
        case 'center':
            return 'align-center';
            break;
        case 'right':
            return 'align-right';
            break;
        case 'ALIGNLEFT':
            return 'text-left'; 
            break;
        case 'ALIGNRIGHT':
            return 'text-right'; 
            break;
        case 'ALIGNCENTER':
            return 'text-center'; 
            break;
        default:
            return null;
    }
}
export default TextEditor;