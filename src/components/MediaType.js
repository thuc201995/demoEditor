import React from 'react';

class MediaType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showToolbar:false
        }
    }
    mountHover=()=>{
        this.setState({showToolbar:true})
    }
    onAlignment(){

        this.props.ToggleBlockType.ToggleBlockType("right");
    }
    render(){
        const {block,contentState,blockProps} = this.props;
       
        let toolbar="";
        if (this.state.showToolbar) {
            toolbar =
                <div>
                   <button onClick={()=>{this.props.ImageAlingment(contentState,"right",block.getEntityAt(0))}}>Right</button>
                </div>;
        }
        const entity = contentState.getEntity(
            block.getEntityAt(0)
        );
        const {src,alignment} = entity.getData();
        console.log(entity.getData())
        return (
            <div >
                {toolbar}
                <div onMouseEnter={this.mountHover} className={alignment==="right" ? "ailgn-right":""}>
                    <img src={src} alt="" />
                </div>
            </div>

        );
    }

}

export default MediaType;