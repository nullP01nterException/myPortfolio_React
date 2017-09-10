class ArtThumbnail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="artThumbnail" onClick={()=>this.props.setCurrentSrc(this.props.getSrc, this.props.picWidth)}>
				<div className="outerHexagon">
					<div className="innerHexagon">
						<div className="innerHexagon2"
							style={{backgroundImage:"url("+this.props.getSrc+")",
									backgroundPosition: this.props.getBackgroundPos,
									backgroundSize: this.props.getSize
								}}>
						</div>
					</div>
				</div>
			</div>
		);
	}
}