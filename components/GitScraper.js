/*GitHub repo search and sort
  Pass data between GitCompare and GitCompareButton for sorting

  Children:
    -GitCompareInstance
    -AddCompareComponent
    -GitCompareButton
*/

class GitScraper extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			canCompare: false,
			getShow: false,

			compareInstanceArr: [],
			scoreArr: [],
			responseArr: [],
			tempArr: [],

			objectKey: 0
		};
		this.deleteCompareInstance = this.deleteCompareInstance.bind(this);
		this.enableCompare = this.enableCompare.bind(this);
		this.resetCompareInstanceArray = this.resetCompareInstanceArray.bind(this);

		this.setScoreArray = this.setScoreArray.bind(this);
		this.resetScoreArray = this.resetScoreArray.bind(this);
		this.setObjectKey = this.setObjectKey.bind(this);

		this.pushComponent = this.pushComponent.bind(this);
		this.pushFrontComponent = this.pushFrontComponent.bind(this);
	}

	//Pushes first component into array when mounting
	componentWillMount(){
		this.pushComponent();
	}

	//Pushes a second component since setState has finished updating state here
	componentDidMount(){
		this.pushComponent();
	}

	//fires when AddCompareComponent button is pressed
	pushComponent(){
		this.state.compareInstanceArr.push(<GitCompare
											key={this.state.objectKey}
											number={this.state.objectKey}
											deleteCompareInstance={this.deleteCompareInstance}
											setScoreArray={this.setScoreArray}/>);
		this.setState({
			objectKey: this.state.objectKey+1
		}, ()=>{
			this.enableCompare();
		});
	}

	//for appending to front of array (not used)
	pushFrontComponent(){
		this.state.compareInstanceArr.unshift(<GitCompare
												key={this.state.objectKey}
												number={this.state.objectKey}
												deleteCompareInstance={this.deleteCompareInstance}
												setScoreArray={this.setScoreArray}/>);
		this.setState({
			objectKey: this.state.objectKey+1
		});
	}

	//gives a key for each GitCompare instance
	setObjectKey(num){
		this.setState({
			objectKey: num
		});
	}

	//updates array and view after repos are sorted
	setScoreArray(key, score){
		var stringedKey = key.toString();
		this.state.scoreArr.push({key:key, score:score});
		this.enableCompare();
	}


	//updates array and view after repos are sorted
	resetScoreArray(score){
		this.setState({
			scoreArr: score
		},()=>{
			this.forceUpdate();
		});
	}

	//called by GitCompareButton to update view after components have been sorted
	resetCompareInstanceArray(arr){
		this.setState({
			compareInstanceArr: arr
		},()=>{
			this.forceUpdate();
		});
	}

	//enables compare button when correct input detected
	enableCompare(){
		document.getElementById("finishIcon").style.display="none";
		if(this.state.scoreArr.length >= 2 && this.state.scoreArr.length == this.state.compareInstanceArr.length){
			for(var i = 0; i < this.state.compareInstanceArr.length; i++){
				if(Object.keys(this.state.compareInstanceArr[i]).length <= 2){
					return;
				}
			}
			this.setState({
				canCompare: true
			});
		}else{
			this.setState({
				canCompare: false
			});
		}
	}

	//delete a gitCompare instance
	deleteCompareInstance(pos){
		var index = -1;
		for(var i = 0; i < this.state.compareInstanceArr.length; i++){
			if(this.state.compareInstanceArr[i].key == pos){
				index = i;
			}
		}
		if(index == -1){return;}

		this.state.compareInstanceArr.splice(index, 1);
		this.state.scoreArr.splice(index,1);
		this.enableCompare();
		this.forceUpdate();
	}

	render(){
		return(
			<div id="programmingContent">
				<div className="searchCompareComponent">
					{/*<AddCompareComponent onClick={this.pushFrontComponent}/>*/}
					{this.state.compareInstanceArr}
				</div>

				<div className="programmingButtons">
					<AddCompareComponent onClick={this.pushComponent}/>
					<GitCompareButton
						canCompare={this.state.canCompare}
						resetScoreArray={this.resetScoreArray}
						resetCompareInstanceArray={this.resetCompareInstanceArray}
						getScoreArr={this.state.scoreArr}
						getCompareInstanceArr={this.state.compareInstanceArr} />
				</div>
			</div>
		);
	}
}