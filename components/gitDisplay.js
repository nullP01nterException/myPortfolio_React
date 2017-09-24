//Displays information from GitSearch

class GitDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var response = this.props.getResponse;

		var showName = null;
		if(Object.keys(response).length != 2){
			showName = <a className="userText userName" href={response.html_url}>{response.login}</a>;
		}else{
			showName=<span className="userText userName" style={{color:'red'}}>{response.message}</span>;
		}

		return(
			<div className="box">
				<img className="userImg" src={response.avatar_url} style={{display: this.props.getShow ? 'inline-block' : 'none'}}></img>
				
				<div className="nameDiv userText">
					{showName}
					<span style={{display: this.props.getShow ? 'inline-block' : 'none'}}>
						&nbsp;&nbsp; Score: {this.props.getScore}
					</span>
				</div>

				<div className="infoBox" style={{display: this.props.getShow ? 'inline-block' : 'none'}}>
					<div className="forkDiv">
						<div type="text" className="userText numLabels">Forks</div>
						<div className="userText nums">{this.props.getForks}</div>
					</div>

					<div className="starDiv">
						<div type="text" className="userText numLabels">Stars</div>
						<div className="userText nums">{this.props.getStars}</div>
					</div>

					<div className="watcherDiv">
						<div type="text" className="userText numLabels">Watchers</div>
						<div className="userText nums">{this.props.getWatchers}</div>
					</div>
				</div>

				<button className="deleteButton" >
					<i className="glyphicon glyphicon-trash" onClick={() => this.props.deleteCompareInstance(this.props.number)}></i>
				</button>
			</div>
		)
	}
}