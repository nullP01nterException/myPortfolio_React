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
				</div>

				<div className="infoBox" style={{display: this.props.getShow ? 'block' : 'none'}}>
					<div id="repoDiv">
						<div type="text" className="userText numLabels">Repos</div>
						<div id="repoNum" className="userText nums">{response.public_repos}</div>
					</div>

					<div id="followerDiv">
						<div type="text" className="userText numLabels">Followers</div>
						<div id="followersNum" className="userText nums">{response.followers}</div>
					</div>

					<div id="orgDiv">
						<div type="text" className="userText numLabels">Following</div>
						<div id="orgNum" className="userText nums">{response.following}</div>
					</div>
				</div>
			</div>
		)
	}
}