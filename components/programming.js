class Programming extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			canCompare: false,
			getShow: false,
			getCompareShow: false,

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
			count: 0
		};
		this.enableCompare = this.enableCompare.bind(this);
		this.deleteCompareInstance = this.deleteCompareInstance.bind(this);
		this.setShow = this.setShow.bind(this);
		this.setCompareShow = this.setCompareShow.bind(this);

		this.setScoreArray = this.setScoreArray.bind(this);
		this.resetScoreArray = this.resetScoreArray.bind(this);
		this.setResponseArray = this.setResponseArray.bind(this);
		this.resetResponseArray = this.resetResponseArray.bind(this);
		this.setObjectKey = this.setObjectKey.bind(this);

		this.setStarArray = this.setStarArray.bind(this);
		this.setForkArray = this.setForkArray.bind(this);
		this.setWatcherArray = this.setWatcherArray.bind(this);
		this.resetStarArray = this.resetStarArray.bind(this);
		this.resetForkArray = this.resetForkArray.bind(this);
		this.resetWatcherArray = this.resetWatcherArray.bind(this);
	}

	setObjectKey(num){
		this.setState({
			objectKey: num
		});
	}

	setStarArray(num){
		this.setState({
			starArr:this.state.starArr.concat(num)
		});
	}

	resetStarArray(arr){
		this.setState({
			starArr: arr
		});
	}

	setForkArray(num){
		this.setState({
			forkArr: this.state.forkArr.concat(num)
		});
	}

	resetForkArray(arr){
		this.setState({
			forkArr: arr
		});
	}

	setWatcherArray(num){
		this.setState({
			watcherArr: this.state.watcherArr.concat(num)
		});
	}

	resetWatcherArray(arr){
		this.setState({
			watcherArr: arr
		});
	}

	setResponseArray(response){
		if(response !== undefined){
			this.setState({
				getShow: true,
				responseArr: this.state.responseArr.concat(response)
			});
		}
	}

	resetResponseArray(response){
		this.setState({
			responseArr: response
		});
	}

	setScoreArray(score){
		this.setState({
			count: this.state.count + 1
		},() =>{
			if(this.state.count%4==0){
				this.setState({
					scoreArr: this.state.scoreArr.concat(score),
					count: 0
				});
			}
		});

		//set enableCompare here b/c state not updated after setState in setResponseArray
		this.enableCompare();
	}

	resetScoreArray(score){
		this.setState({
			scoreArr: score
		});
	}

	setShow(show){
		this.setState({
			getShow: show
		});
	}

	setCompareShow(show){
		this.setState({
			getCompareShow: show
		});
	}

	//enables compare button when correct input detected
	enableCompare(){
		if(this.state.responseArr.length >=2 && this.state.responseArr.length <= 10){
			for(var i = 0; i < this.state.responseArr.length; i++){
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
				}
			}
		}else{
			this.setState({
				canCompare: false
			});
		}
	}

	//delete a gitCompareInstance
	deleteCompareInstance(pos){
		console.log(this.state.watcherArr);
			var index = pos;

			var tempArr = this.state.responseArr;
			var tempScoreArr = this.state.scoreArr;
			var tempStarArr = this.state.starArr;
			var tempForkArr = this.state.forkArr;
			var tempWatcherArr = this.state.watcherArr;

			tempArr.splice(index, 1);
			tempScoreArr.splice(index,1);
			tempStarArr.splice(index,1);
			tempForkArr.splice(index,1);
			tempWatcherArr.splice(index,1);

			this.setState({
				responseArr: tempArr,
				scoreArr: tempScoreArr,
				starArr: tempStarArr,
				forkArr: tempForkArr,
				watcherArr: tempWatcherArr
			});
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
									getForks={this.state.forkArr[i]}
									getStars={this.state.starArr[i]}
									getWatchers={this.state.watcherArr[i]}
									deleteButton={this.deleteCompareInstance} />);
			}
		}

		return(
			<div className="programmingContent topMargin">
				<GitSearch
					setResponseArray={this.setResponseArray}
					setSuccess={this.setIsSuccess}
					setUserText={this.setUserText}
					setScore={this.setScoreArray}
					setStarCount={this.setStarArray}
					setWatcherCount={this.setWatcherArray}
					setForkCount={this.setForkArray}
					setObjectKey={this.setObjectKey}
					setCompareShow={this.setCompareShow}
					getObjectKey={this.state.objectKey} />

				<div>
					<GitCompareButton
						canCompare={this.state.canCompare}
						resetResponseArray={this.resetResponseArray}
						resetScoreArray={this.resetScoreArray}
						resetStarArray={this.resetStarArray}
						resetForkArray={this.resetForkArray}
						resetWatcherArray={this.resetWatcherArray}
						setShow={this.setShow}
						setCompareShow={this.setCompareShow}
						getCompareShow={this.state.getCompareShow}
						getScoreArr={this.state.scoreArr}
						getResponseArr={this.state.responseArr}
						getStarArr={this.state.starArr}
						getForkArr={this.state.forkArr}
						getWatcherArr={this.state.forkArr}
						deleteCompareInstance={this.deleteCompareInstance} />
				</div>

				<div className="textWinner">
					{gitDisplayArr}
				</div>
			</div>
		);
	}
}