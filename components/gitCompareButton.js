//compares all the scores
class GitCompareButton extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			scoreArr: this.props.getScoreArr,
			responseArr: this.props.getResponseArr,
			starArr: this.props.getStarArr,
			forkArr: this.props.getForkArr,
			watcherArr: this.props.getWatcherArr,
			keyArr: this.props.getKeyArr,

			showWinner: false
		};
		this.updateValues = this.updateValues.bind(this);
		this.compareScore = this.compareScore.bind(this);
		this.showResultDiv = this.showResultDiv.bind(this);
	}

	showResultDiv(){
		if(document.getElementById("textWinner") != null){
			document.getElementById("textWinner").style.display = "block";
		}

		for(var i = 0; i < document.getElementsByClassName("boxWinner").length; i++){
			if(document.getElementsByClassName("boxWinner")[i] != null){
				document.getElementsByClassName("boxWinner")[i].style.display = "block";
			}
		}
	}

	//re-update values in case user changes any
	updateValues(){
		this.setState({
			scoreArr: this.props.getScoreArr,
			responseArr: this.props.getResponseArr,
			starArr: this.props.getStarArr,
			forkArr: this.props.getForkArr,
			watcherArr: this.props.getWatcherArr,
			keyArr: this.props.getKeyArr
		}, () => {this.compareScore()});
	}

	//insertion sort score from greatest to least and sort keys in that order
	compareScore(){
		this.setState({
			showWinner: true
		});

		var pos = 1;
		var tempScoreArr = this.state.scoreArr;
		var tempKeyArr = this.state.keyArr;
		var tempScoreVal = this.state.scoreArr[0];
		var tempKeyVal = this.state.keyArr[0];

		for(var i = 1; i < tempScoreArr.length; i++){
			pos = i;
			tempScoreVal = tempScoreArr[i];
			tempKeyVal = tempKeyArr[i];

			while(pos > 0 && tempScoreArr[pos-1] < tempScoreVal){
				tempScoreArr[pos] = tempScoreArr[pos-1];
				tempKeyArr[pos] = tempKeyArr[pos-1];
				pos--;
			}
			tempScoreArr[pos] = tempScoreVal;
			tempKeyArr[pos] = tempKeyVal;
		}

		this.setState({
			scoreArr: tempScoreArr,
			keyArr: tempKeyArr
		});

		this.showResultDiv();
	}

	//scroll down to results
	componentDidUpdate(){
		if(document.getElementById("textWinner") !== null){
			if(document.getElementById("textWinner").offsetParent !== null){
				$('html,body').animate({scrollTop: $(".textWinner").offset().top},'slow');
			}
		}
	}

	render(){
		var resultArr = [];

		for(var i = 0; i < this.state.scoreArr.length; i++){
			var currResponse = this.state.responseArr[this.state.keyArr[i]];

			if(currResponse != undefined){
				resultArr.push(<BoxWinner
									key={i}
									showWinner={this.state.showWinner}
									currResponse={currResponse}
									getStar={this.state.starArr[this.state.keyArr[i]]}
									getScore={this.state.scoreArr[i]}
									getWatcher={this.state.watcherArr[this.state.keyArr[i]]}
									getFork={this.state.forkArr[this.state.keyArr[i]]} />);
			}
		}

		return(
			<div className="winnerDiv">
				<button className="compareButton"
					onClick={this.updateValues}
					disabled={!this.props.canCompare}>
						Compare
				</button>

				<div className="textWinner" id="textWinner" style={{display: this.state.showWinner ? 'block':'none'}}>
					Winner:
					<div className="spacing" style={{display: this.state.showWinner ? 'block':'none'}}>
						{resultArr}
					</div>
				</div>
			</div>
		);
	}
}