import React from 'react';

class MediaType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showToolbar:false
        }
    }
    mountHover=()=>{
        const showToolbar = !this.state.showToolbar;
        this.setState({
            showToolbar,
        });
    }
    onAlignment(){

        this.props.ToggleBlockType.ToggleBlockType("right");
    }
    render(){
        const {block,contentState,blockProps} = this.props;
       
        let toolbar="";
        if (this.state.showToolbar) {
            toolbar =
                <div className="image-alignment-options-popup">
                    <div 
                        className="option-wrapper image-alignment-option" 
                        onClick={()=>{this.props.ImageAlingment(contentState,"left",block.getEntityAt(0))}}
                    >
                       <img src="./images/image-align-left.svg" />
                        
                    </div>
                    <div 
                        className="option-wrapper image-alignment-option" 
                        onClick={()=>{this.props.ImageAlingment(contentState,"center",block.getEntityAt(0))}}
                    >
                        <img src="./images/image-align-center.svg" />
                    </div>
                    <div 
                        className="option-wrapper image-alignment-option" 
                        onClick={()=>{this.props.ImageAlingment(contentState,"right",block.getEntityAt(0))}}
                    >
                       <img src="./images/image-align-right.svg" />
                    </div>
                
                </div>;
        }
        const entity = contentState.getEntity(
            block.getEntityAt(0)
        );
        const {src,alignment} = entity.getData();
        return (
            <div >
            
                <div
                    className={alignment==="right" ? "ailgn-right":alignment==="center" ? "align-center":"align-left"}
                >   {toolbar}
                    <img src={src} alt="" onMouseEnter={this.mountHover} />
                </div>
            </div>

        );
    }

}

export default MediaType;