import React from 'react';
import StyleButton from './StyleButton';
const ALIGN_STYLE = [
    {label: 'Align Left', style: 'ALIGNLEFT',icon:"align-left.svg"},
    {label: 'Align Right', style: 'ALIGNRIGHT',icon:"align-right.svg"},
    {label: 'Align Center', style: 'ALIGNCENTER',icon:"align-center.svg"},
];

class AlignText  extends React.Component{

    onToggle=(style)=>{
        this.props.ToggleAlignType(style)
    }
    
    render(){
        const currentStyle =this.props.EditorReducer.editorState.getCurrentInlineStyle();
        
        return (
            <div className="inline-wrapper">
                {ALIGN_STYLE.map(type =>
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
export default AlignText;