import React from 'react';
import StyleButton from "./StyleButton";

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD',icon:"bold.svg"},
    {label: 'Italic', style: 'ITALIC',icon: "italic.svg"},
    {label: 'Underline', style: 'UNDERLINE',icon:"underline.svg"},
    {label: 'Monospace', style: 'CODE',icon:"monospace.svg"},
];
class InlineStyle extends React.Component{

    onToggle=(style)=>{
        this.props.ToggleInlineStyle(style)
    }
    render(){
        const currentStyle =this.props.EditorReducer.editorState.getCurrentInlineStyle();
        return (
            <div className="inline-wrapper">
                {INLINE_STYLES.map(type =>
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

export default InlineStyle;