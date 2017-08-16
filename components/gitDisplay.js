class GitDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var response = this.props.getResponse;
		//console.log(this.props.getForks);
		//console.log(this.props.number);
		//console.log(this.props.getForks[this.props.number]);

		var showName = null;
		if(this.props.getShow){
			showName = <a id="userName" className="userText" href={response.html_url}>{response.login}</a>;
		}else{
			showName=<a id="userName" className="userText" href="">{response.message}</a>;
		}

		return(
			<div className="box" style={{display: this.props.getShow ? 'block' : 'none'}}>
				<img id="userImg" src={response.avatar_url} 
					style={{display: this.props.getShow ? 'block' : 'none'}}></img>
				<div className="nameDiv userText">
					{showName} &nbsp;&nbsp; Score: {this.props.getScore}
				</div>

				<button className="deleteButton" >
					<i className="glyphicon glyphicon-trash" onClick={() => this.props.deleteButton(this.props.number)}></i>
				</button>

				<div className="infoBox">
					<div id="forkDiv">
						<div type="text" className="userText numLabels">Forks</div>
						<div id="repoNum" className="userText nums">{this.props.getForks}</div>
					</div>

					<div id="starDiv">
						<div type="text" className="userText numLabels">Stars</div>
						<div id="followersNum" className="userText nums">{this.props.getStars}</div>
					</div>

					<div id="watcherDiv">
						<div type="text" className="userText numLabels">Watchers</div>
						<div id="orgNum" className="userText nums">{this.props.getWatchers}</div>
					</div>
				</div>
			</div>
		)
	}
}