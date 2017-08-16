//compares all the scores
class GitCompareButton extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			scoreArr: this.props.getScoreArr,
			responseArr: this.props.getResponseArr,
			starArr: this.props.getStarArr,
			forkArr: this.props.getForkArr,
			watcherArr: this.props.getWatcherArr
		};
		this.updateValues = this.updateValues.bind(this);
		this.compareScore = this.compareScore.bind(this);
	}

	//re-update values in case user changes any
	updateValues(){
		this.props.setShow(false);
		this.setState({
			scoreArr: this.props.getScoreArr,
			responseArr: this.props.getResponseArr,
			starArr: this.props.getStarArr,
			forkArr: this.props.getForkArr,
			watcherArr: this.props.getWatcherArr
		}, () => {this.compareScore()});
	}

	//insertion sort score from greatest to least and sort keys in that order
	compareScore(){
		this.props.setCompareShow(true);

		var pos = 1;
		var tempScoreVal = this.state.scoreArr[0];
		var tempResponseVal = this.state.responseArr[0];
		var tempStarVal = this.state.starArr[0];
		var tempForkVal = this.state.forkArr[0];
		var tempWatcherVal = this.state.watcherArr[0];

		for(var i = 1; i < this.state.responseArr.length; i++){
			pos = i;
			tempScoreVal = this.state.scoreArr[i];
			tempResponseVal = this.state.responseArr[i];
			tempStarVal = this.state.starArr[i];
			tempForkVal = this.state.forkArr[i];
			tempWatcherVal = this.state.watcherArr[i];

			while(pos > 0 && this.state.scoreArr[pos-1] < tempScoreVal){
				this.state.scoreArr[pos] = this.state.scoreArr[pos-1];
				this.state.responseArr[pos] = this.state.responseArr[pos-1];
				this.state.starArr[pos] = this.state.starArr[pos-1];
				this.state.forkArr[pos] = this.state.forkArr[pos-1];
				this.state.watcherArr[pos] = this.state.watcherArr[pos-1];
				pos--;
			}
			this.state.scoreArr[pos] = tempScoreVal;
			this.state.starArr[pos] = tempStarVal;
			this.state.responseArr[pos] = tempResponseVal;
			this.state.forkArr[pos] = tempForkVal;
			this.state.watcherArr[pos] = tempWatcherVal;
		}
		this.props.resetResponseArray(this.state.responseArr);
		this.props.resetScoreArray(this.state.scoreArr);
		this.props.resetStarArray(this.state.starArr);
		this.props.resetForkArray(this.state.forkArr);
		this.props.resetWatcherArray(this.state.watcherArr);
		console.log(this.state.forkArr);
	}

	//scroll down to results
	/*componentDidUpdate(){
		if(document.getElementById("textWinner") !== null){
			if(document.getElementById("textWinner").offsetParent !== null){
				$('html,body').animate({scrollTop: $(".textWinner").offset().top},'slow');
			}
		}
	}*/

	render(){
		var resultArr = [];

		for(var i = 0; i < this.state.starArr.length; i++){
			var currResponse = this.state.responseArr[i];
				resultArr.push(<GitDisplay
									key={i}
									number={i}
									getShow={this.props.getCompareShow}
									getResponse={currResponse}
									getStars={this.state.starArr[i]}
									getScore={this.state.scoreArr[i]}
									getWatchers={this.state.watcherArr[i]}
									getForks={this.state.forkArr[i]}
									deleteButton={this.props.deleteCompareInstance} />);
		}


		return(
			<div className="winnerDiv">
				<button className="compareButton"
					onClick={this.updateValues}
					disabled={!this.props.canCompare}>
						Compare
				</button>

				<div className="textWinner" id="textWinner">
					{resultArr}
				</div>
			</div>
		);
	}
}