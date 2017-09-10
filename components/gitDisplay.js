class GitDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var response = this.props.getResponse;

		var showName = null;
		if(Object.keys(response).length != 2){
			showName = <a id="userName" className="userText" href={response.html_url}>{response.login}</a>;
		}else{
			showName=<span id="userName" className="userText" style={{color:'red'}}>{response.message}</span>;
		}

		return(
			<div className="box">
				<img id="userImg" src={response.avatar_url} style={{display: this.props.getShow ? 'inline-block' : 'none'}}></img>
				
				<div className="nameDiv userText">
					{showName}
					<span style={{display: this.props.getShow ? 'inline-block' : 'none'}}>
						&nbsp;&nbsp; Score: {this.props.getScore}
					</span>
				</div>

				<div className="infoBox" style={{display: this.props.getShow ? 'inline-block' : 'none'}}>
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

				<button className="deleteButton" >
					<i className="glyphicon glyphicon-trash" onClick={() => this.props.deleteCompareInstance(this.props.number)}></i>
				</button>
			</div>
		)
	}
}