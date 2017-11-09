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
        console.log(this.props.ToggleBlockType)
        let toolbar="";
        if (this.state.showToolbar) {
            toolbar =
                <div>
                   <button onClick={()=>{this.props.ToggleBlockType("right")}}>Right</button>
                </div>;
        }
        const {block,contentState,blockProps} = this.props;
        const entity = contentState.getEntity(
            block.getEntityAt(0)
        );
        const {src} = entity.getData();
        return (
            <div>
                {toolbar}
                <div onMouseEnter={this.mountHover}>
                    <img src={src} alt=""/>
                </div>
            </div>

        );
    }

}

export default MediaType;