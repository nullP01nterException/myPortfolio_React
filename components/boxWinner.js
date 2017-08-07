//renders the result of gitCompare
class BoxWinner extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="boxWinner" style={{display: this.props.showWinner ? 'block':'none'}}>
				<img id="winnerImg" src={this.props.currResponse.avatar_url}></img>
				<div className="userText winnerText">
					<div className="winnerName">{this.props.currResponse.login} &nbsp;&nbsp; Score: {this.props.getScore}</div>
					<div className="winnerInfo">
						<div id="starDiv">
							<div>Stars</div>
							{this.props.getStar}
						</div>
						<div id="forkDiv">
							<div>Forks</div>
							{this.props.getFork}
						</div>
						<div id="watcherDiv">
							<div>Watchers</div>
							{this.props.getWatcher}
						</div>
					</div>
				</div>
			</div>
		)
	}
}