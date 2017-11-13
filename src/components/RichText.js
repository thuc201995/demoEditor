import React from "react";
import {Editor, EditorState, RichUtils,AtomicBlockUtils,convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
class RichText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          editorState: EditorState.createEmpty(),
          showURLInput: false,
          url: '',
          urlType: '',
      
        };
      this.focus = () => this.refs.editor.focus();
      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.onTab = this._onTab.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
      this.addImage = this._addImage.bind(this);
       this.onURLChange = (e) => this.setState({urlValue: e.target.value});
       this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
       this.confirmMedia = this._confirmMedia.bind(this);
    }
    onChange = (e) => {this.setState({e});};

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
          this.onChange(newState);
          return true;
      }
      return false;
    }
    _onTab(e) {
      const maxDepth = 4;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }
    _onURLInputKeyDown(e) {
        if (e.which === 13) {
          this._confirmMedia(e);
        }
      }
    _promptForMedia(type) {
        const {editorState} = this.state;
        this.setState({
          showURLInput: true,
          urlValue: '',
          urlType: type,
        }, () => {
          setTimeout(() => this.refs.url.focus(), 0);
        });
      }
      _confirmMedia(e) {
        e.preventDefault();
        const {editorState, urlValue, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          urlType,
          'IMMUTABLE',
          {src: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          {currentContent: contentStateWithEntity}
        );
        this.setState({
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
          ),
          showURLInput: false,
          urlValue: '',
        });
  
      }
    _addImage() {
        this._promptForMedia('image');
      }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
  
    
    render() {
      const {editorState} = this.state;
      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
        let urlInput;
          if (this.state.showURLInput) {
            urlInput =
              <div style={styles.urlInputContainer}>
                <input
                  onChange={this.onURLChange}
                  ref="url"
                  style={styles.urlInput}
                  type="text"
                  value={this.state.urlValue}
                  onKeyDown={this.onURLInputKeyDown}
                />
                <button onMouseDown={this.confirmMedia}>
                  Confirm
                </button>
              </div>;
          }
          const markup = stateToHTML(editorState.getCurrentContent());
     
      return (
        <div className="RichEditor-root">
             <button onMouseDown={this.addImage} style={{marginRight: 10}}>
                Add Image
            </button>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          {urlInput}
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              blockRendererFn={mediaBlockRenderer}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
              onClick={this.alignmentImage}
            />
          </div>
          <div>{markup}</div>
        </div>
      );
    }
  }
  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };
  class Media extends React.Component {
    constructor(){
      super();
      this.state={
        toolbarAlign:false
      }
    }
    onClick=()=>{
      this.setState({
        toolbarAlign:true
      })
    };
    handleClick(){
      const {onToggle} = this.props.blockProps;
      console.log(onToggle)
    }
    onToggle=()=>{
      console.log(this.props.blockProps)
    }
    
    render() {
      const {block,contentState,blockProps} = this.props;
      const entity = contentState.getEntity(
        block.getEntityAt(0)
      );
      console.log(blockProps.onToggle)
      const {src} = entity.getData();
      const type = entity.getType();
      let media;
      if (type === 'image') {
        media = <Image src={src} onClick={blockProps.onToggle}/>;
      }
   
      return (
          <div>
            <StyleButton
            key="right"
            label="right"
            onToggle={this.onToggle}
            style="align-left"
          />
            {this.state.toolbarAlign ? <div onClick={this.handleClick}>Right</div>:""}
          {media}
          </div>
        
      )
    }
  }
  
 
  const Image = (props) => {
    return (
      <div>
        <img src={props.src} style={styles.media} onClick={props.onClick} />
      </div>
    );
  }
  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'superFancyBlockquote';
      case 'left':
        return 'align-left';
    case 'center':
        return 'align-center';
    case 'right':
      return 'align-right';
      default: return null;
    }
  } 
  function mediaBlockRenderer(block) {

    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
       
      };
    }
    return null;
  }
  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }
  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
    {label: ' Right', style: 'right'},
    
    
  ];
  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };
  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];
  const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  const styles = {
    root: {
      fontFamily: '\'Georgia\', serif',
      padding: 20,
      width: 600,
    },
    buttons: {
      marginBottom: 10,
    },
    urlInputContainer: {
      marginBottom: 10,
    },
    urlInput: {
      fontFamily: '\'Georgia\', serif',
      marginRight: 10,
      padding: 3,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
    media: {
 
      // Fix an issue with Firefox rendering video controls
      // with 'pre-wrap' white-space
      whiteSpace: 'initial'
    },
  };

  export default RichText;