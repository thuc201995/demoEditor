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
                <div

                    className={alignment==="right" ? "ailgn-right":""}
                >
                    <img src={src} alt="" onMouseEnter={this.mountHover} onMouseLeave={this.mountHover}/>
                </div>
            </div>

        );
    }

}

export default MediaType;