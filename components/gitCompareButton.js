//Compares scores from GitCompare component
class GitCompareButton extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			scoreArr: this.props.getScoreArr,
			compareInstanceArr: this.props.getCompareInstanceArr,
			showLoading: false,
			showFinish: false
		};
		this.updateValues = this.updateValues.bind(this);
		this.compareScore = this.compareScore.bind(this);
	}

	//re-update values in case user changes any
	updateValues(){
		this.setState({
			showLoading: true,
			showFinish: false,
			scoreArr: this.props.getScoreArr,
			compareInstanceArr: this.props.getCompareInstanceArr
		}, () => {this.compareScore()});
	}

	//insertion sort score from greatest to least and sort keys in that order
	compareScore(){
		var pos = 1;
		var tempScoreVal = this.state.scoreArr[0];
		var tempCompareVal = this.state.compareInstanceArr[0];

		for(var i = 1; i < this.state.compareInstanceArr.length; i++){
			pos = i;
			tempScoreVal = this.state.scoreArr[i];
			tempCompareVal = this.state.compareInstanceArr[i];

			while(pos > 0 && this.state.scoreArr[pos-1].score < tempScoreVal.score){
				this.state.scoreArr[pos] = this.state.scoreArr[pos-1];
				this.state.compareInstanceArr[pos] = this.state.compareInstanceArr[pos-1];
				pos--;
			}
			this.state.scoreArr[pos] = tempScoreVal;
			this.state.compareInstanceArr[pos] = tempCompareVal;
		}
		this.props.resetCompareInstanceArray(this.state.compareInstanceArr);
		this.props.resetScoreArray(this.state.scoreArr);
		//change button loading to success
		this.setState({
			showLoading: false,
			showFinish: true
		});
	}

	render(){
		return(
			<div className="compareDiv">
				<button className="compareButton"
					onClick={this.updateValues}
					disabled={!this.props.canCompare}>
					<i className="glyphicon glyphicon-sort" style={{display: 'inline-block'}}></i>
					&nbsp;Sort Repos&nbsp;

					<i className="fa fa-circle-o-notch fa-spin"
						style={{display: this.state.showLoading ? 'inline-block':'none'}}></i>

					<i className="glyphicon glyphicon-ok-circle"
						id="finishIcon" style={{display: this.state.showFinish ? 'inline-block':'none'}}></i>
				</button>
			</div>
		);
	}
}