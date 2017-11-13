import React from 'react';
import DropDownStyle from "./DropdownStyle";
const BLOCK_TYPES = [
    {label: 'Normal', style: 'Normal'},    
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
  
];


class BlockType extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            showDropdown:false,
            activeSelection:""
        })
    }
    onToggle=(style,id)=>{
        this.props.ToggleBlockType(style);
        this.setState({
            activeSelection:id
        })
    }
    handleDropdown=()=>{
        const showDropdown = !this.state.showDropdown;
        this.setState({
            showDropdown,
        });
        
    }
 
    render(){
        const blockType = this.props.EditorReducer.editorState
            .getCurrentContent()
            .getBlockForKey(this.props.EditorReducer.editorState.getSelection().getStartKey())
            .getType();
        let dropdwnSelected;
        let dropDown="";
        if(!this.state.showDropdown){
           
            if(this.state.activeSelection==""){
                dropdwnSelected =<span className="dropdown-selectedtext">Normal</span>
            }
            else dropdwnSelected=<span className="dropdown-selectedtext">{this.state.activeSelection}</span>
        }
        if(this.state.showDropdown){
            dropDown= BLOCK_TYPES.map((type) =>
            <DropDownStyle
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={this.onToggle}
                style={type.style}
            />
            )
           
        }
       
        return (
            <div className="block-wrapper">
                <div className="dropdown-wrapper block-dropdown" aria-expanded="false"  onClick={this.handleDropdown}>
                {dropdwnSelected}
                    
                    <ul className="dropdown-optionwrapper">
                  
                    {dropDown}
                    </ul>
                    
                </div>
              
            </div>
        );
    }

}

export default BlockType;