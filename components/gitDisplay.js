class GitDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var response = this.props.getResponse;

		var showName = null;
		if(this.props.getShow){
			showName = <a id="userName" className="userText" href={response.html_url}>{response.login}</a>;
		}else{
			showName=<a id="userName" className="userText" href="">{response.message}</a>;
		}

		return(
			<div className="box" style={{visibility: this.props.getShow ? 'visible' : 'hidden'}}>
				<img id="userImg" src={response.avatar_url} 
					style={{display: this.props.getShow ? 'block' : 'none'}}></img>
				<div className="nameDiv">
					{showName}
					Score: {this.props.getScore}
				</div>

				<div className="infoBox">
					<div id="forkDiv">
						<div type="text" className="userText numLabels">Forks</div>
						<div id="repoNum" className="userText nums">{this.props.getForks[this.props.number]}</div>
					</div>

					<div id="starDiv">
						<div type="text" className="userText numLabels">Stars</div>
						<div id="followersNum" className="userText nums">{this.props.getStars[this.props.number]}</div>
					</div>

					<div id="watcherDiv">
						<div type="text" className="userText numLabels">Watchers</div>
						<div id="orgNum" className="userText nums">{this.props.getWatchers[this.props.number]}</div>
					</div>
				</div>
			</div>
		)
	}
}