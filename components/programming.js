class Programming extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			canCompare: false,
			getShow: false,

			scoreArr: [],
			tempScore: 0,

			responseArr: [],
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

	setObjectKey(num){
		this.setState({
			objectKey: num
		});
		//console.log(this.state.objectKey);
	}

	setStarArray(num){
		this.setState({
			tempStar: num
		},()=>{
			var temp = Array.from(this.state.starArr);
			temp[this.state.objectKey] = this.state.tempStar;
			this.setState({
				starArr: temp
			});
		});
	}

	setForkArray(num){
		this.setState({
			tempFork: num
		},()=>{
			var temp = Array.from(this.state.forkArr);
			temp[this.state.objectKey] = this.state.tempFork;
			this.setState({
				forkArr: temp
			});
		});
	}

	setWatcherArray(num){
		this.setState({
			tempWatcher: num
		},()=>{
			var temp = Array.from(this.state.watcherArr);
			temp[this.state.objectKey] = this.state.tempWatcher;
			this.setState({
				watcherArr: temp
			});
		});
	}

	setResponseArray(response){
		this.setState({
			tempArr: response,
			getShow: true
		},()=>{
			var temp = Array.from(this.state.responseArr);
			temp[this.state.objectKey] = this.state.tempArr;
			this.setState({
				responseArr: temp
			});
		});
	}

	setScoreArray(score){
		this.setState({
			tempScore: score
		},()=>{
			var temp = Array.from(this.state.scoreArr);
			temp[this.state.objectKey] = this.state.tempScore;
			this.setState({
				scoreArr: temp
			});
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
		if(this.state.responseArr.length > 0){
			var gitDisplayArr = [];

			for(var i = 0; i < this.state.responseArr.length; i++){
				gitDisplayArr.push(<GitDisplay
									key={i}
									number={i}
									getResponse={this.state.responseArr[i]}
									getScore={this.state.scoreArr[i]}
									getShow={this.state.getShow}
									getForks={this.state.forkArr}
									getStars={this.state.starArr}
									getWatchers={this.state.watcherArr} />);
			}
		}

		return(
			<div className="programmingContent topMargin">
				<GitSearch
					setResponseArray={this.setResponseArray}
					setShow={this.setShowDiv}
					setSuccess={this.setIsSuccess}
					setUserText={this.setUserText}
					setScore={this.setScoreArray}
					setStarCount={this.setStarArray}
					setWatcherCount={this.setWatcherArray}
					setForkCount={this.setForkArray}
					setObjectKey={this.setObjectKey}
					
					getObjectKey={this.state.objectKey} />

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

				<div>
					{gitDisplayArr}
				</div>
			</div>
		);
	}
}