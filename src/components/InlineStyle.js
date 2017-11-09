import React from 'react';
import StyleButton from "./StyleButton";

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];
class InlineStyle extends React.Component{

    onToggle=(style)=>{
        this.props.ToggleInlineStyle(style)
    }
    render(){
        const currentStyle =this.props.EditorReducer.editorState.getCurrentInlineStyle();
        return (
            <div className="RichEditor-controls">
                {INLINE_STYLES.map(type =>
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={this.onToggle}
                        style={type.style}
                    />
                )}
            </div>
        );
    }

}

export default InlineStyle;