class Programming extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			canCompare: false,
			compareInstances: 2,

			scoreArr: [],
			tempScore: 0,

			responseArr: {},
			tempArr: [],

			starArr: [],
			tempStar: 0,

			forkArr: [],
			tempFork: 0,

			watcherArr: [],
			tempWatcher: 0,

			objectKey: 0,
			keyArr: [0,1]
		};
		this.hideResultDiv = this.hideResultDiv.bind(this);
		this.checkButtons = this.checkButtons.bind(this);

		this.enableCompare = this.enableCompare.bind(this);
		this.addCompareInstance = this.addCompareInstance.bind(this);
		this.deleteCompareInstance = this.deleteCompareInstance.bind(this);

		this.setScoreArray = this.setScoreArray.bind(this);
		this.setResponseArray = this.setResponseArray.bind(this);
		this.setObjectKey = this.setObjectKey.bind(this);

		this.setStarArray = this.setStarArray.bind(this);
		this.setForkArray = this.setForkArray.bind(this);
		this.setWatcherArray = this.setWatcherArray.bind(this);
	}

	shouldComponentUpdate(){
		//replaces entry of key
		this.state.responseArr[this.state.objectKey] = this.state.tempArr;
		this.state.starArr[this.state.objectKey] = this.state.tempStar;
		this.state.scoreArr[this.state.objectKey] = this.state.tempScore;
		this.state.forkArr[this.state.objectKey] = this.state.tempFork;
		this.state.watcherArr[this.state.objectKey] = this.state.tempWatcher;

		this.forceUpdate();
		return true;
	}

	setObjectKey(num){
		this.setState({
			objectKey: num
		});
	}

	setStarArray(num){
		this.setState({
			tempStar: num
		});
	}

	setForkArray(num){
		this.setState({
			tempFork: num
		});
	}

	setWatcherArray(num){
		this.setState({
			tempWatcher: num
		});
	}

	setResponseArray(response){
		this.setState({
			tempArr: response
		});
	}

	setScoreArray(score){
		this.setState({
			tempScore: score
		});
		//set enableCompare here b/c state not updated after setState in setResponseArray
		this.enableCompare();
	}

	//hide results if user changes input
	hideResultDiv(){
		if(document.getElementById("textWinner") != null){
			document.getElementById("textWinner").style.display = "none";
		}

		for(var i = 0; i < document.getElementsByClassName("boxWinner").length; i++){
			if(document.getElementsByClassName("boxWinner")[i] != null){
				document.getElementsByClassName("boxWinner")[i].style.display = "none";
			}
		}
	}

	//enables compare button when correct input detected
	enableCompare(){
		for(var i = 0; i < this.state.compareInstances; i++){
			if(this.state.responseArr[i] != null){
				if(Object.keys(this.state.responseArr[i]).length > 2){
					this.setState({
						canCompare: true
					});
				}else{
					this.setState({
						canCompare: false
					});
				}
			}else{
				this.setState({
					canCompare: false
				});

				this.hideResultDiv();
			}
		}
	}

	//add another gitCompareInstance
	addCompareInstance(){
		this.hideResultDiv();

		this.setState({
			keyChangeReady: false
		});

		if(this.state.compareInstances < 10){
			this.setState({
				compareInstances: this.state.compareInstances + 1,
				keyArr: this.state.keyArr.concat(this.state.compareInstances)
			}, () =>{
				this.checkButtons();
				this.enableCompare();
			});
		}
	}

	//delete a gitCompareInstance
	deleteCompareInstance(){
		this.hideResultDiv();

		if(this.state.compareInstances > 2){
			var tempArr = this.state.keyArr;
			tempArr.splice(tempArr.length-1, 1);
			this.setState({
				compareInstances: this.state.compareInstances - 1,
				keyArr: tempArr
			}, () =>{
				this.checkButtons();
				this.enableCompare();
			});
		}
	}

	//set max/min (10,2) amount of gitCompare instnaces
	checkButtons(){
		if(this.state.compareInstances >= 10){
			document.getElementById("addInstance").disabled=true;
		}else if(this.state.compareInstances <= 2){
			document.getElementById("deleteInstance").disabled=true;
		}else{
			document.getElementById("deleteInstance").disabled=false;
			document.getElementById("addInstance").disabled=false;
		}
	}

	render(){
		var compareInstanceArr = [];

		for(var i = 0; i < this.state.compareInstances; i++){
			compareInstanceArr.push(<GitCompare
									key={i}
									number={i}
									setGitScore={this.setScoreArray}
									setResponse={this.setResponseArray}
									setStar={this.setStarArray}
									setFork={this.setForkArray}
									setWatcher={this.setWatcherArray}
									setObjectKey={this.setObjectKey} />);
		}

		return(
			<div className="programmingContent topMargin">
				<AddCompareComponent
					addCompareInstance={this.addCompareInstance}
					deleteCompareInstance={this.deleteCompareInstance}
					getCompareInstances={this.state.compareInstances}>
						{compareInstanceArr}
				</AddCompareComponent>

				<div className="spacing"></div>
				<div>
					<GitCompareButton
						canCompare={this.state.canCompare}
						getScoreArr={this.state.scoreArr}
						getResponseArr={this.state.responseArr}
						getStarArr={this.state.starArr}
						getForkArr={this.state.forkArr}
						getWatcherArr={this.state.forkArr}
						getKeyArr={this.state.keyArr} />
				</div>
			</div>
		);
	}
}