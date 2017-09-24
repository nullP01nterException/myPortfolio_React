class ProjectThumbnail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="userText projectThumbnail"
				style={{display: !this.props.getProjectMode ? "block":"none"}}
				onClick={()=>{this.props.onClick(this.props.projectId)}}>
				<img src={this.props.getSrc}></img>
				<h2>{this.props.getTitle}</h2>
				<p>{this.props.getDescription}</p>
			</div>
		);
	}
}