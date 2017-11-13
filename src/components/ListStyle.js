import React from 'react';
import StyleButton from "./StyleButton";

const LIST_STYLE = [
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item',icon:"list-unordered.svg"},
    {label: 'OL', style: 'ordered-list-item',icon:"list-ordered.svg"},
];

class ListStyle  extends React.Component{

    onToggle=(style)=>{
        this.props.ToggleBlockType(style)
    }
  
    render(){
        const currentStyle =this.props.EditorReducer.editorState.getCurrentInlineStyle();
        return (
            <div className="inline-wrapper">
                {LIST_STYLE.map(type =>
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={this.onToggle}
                        style={type.style}
                        icon={type.icon}
                    />
                )}
        
            </div>
        );
    }

}

export default ListStyle;