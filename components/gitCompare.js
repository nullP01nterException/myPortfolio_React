/*Has a gitSearch and gitDisplay mode
  Passes data between search and display components
  Cookies not implemented

  Children:
  	-GitSearch
  	-GitDisplay
*/
class GitCompare extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			responseList: [],
			showDiv: false,
			userText: "",
			gitScore: 0,
			starCount: 0,
			watcherCount: 0,
			forkCount: 0,
			mode: "search"
		};

		this.setScore = this.setScore.bind(this);
		this.setResponseList = this.setResponseList.bind(this);
		this.setShowDiv = this.setShowDiv.bind(this);
		this.setUserText = this.setUserText.bind(this);
		this.setCookie = this.setCookie.bind(this);

		this.setStarCount = this.setStarCount.bind(this);
		this.setForkCount = this.setForkCount.bind(this);
		this.setWatcherCount = this.setWatcherCount.bind(this);
		this.setMode = this.setMode.bind(this);
	}

	/****causing: Warning: performUpdateIfNecessary: Unexpected batch number (current 10, pending 1)*****/
	/*componentDidMount(){
		this.handleCookie()
	}*/

	setMode(currMode){
		this.setState({
			mode: currMode
		});
	}

	setResponseList(response){
		this.setState({
			responseList: response
		});
	}

	setStarCount(num){
		this.setState({
			starCount: num
		});
	}

	setWatcherCount(num){
		this.setState({
			watcherCount: num
		});
	}

	setForkCount(num){
		this.setState({
			forkCount: num
		});
	}

	setScore(score){
		this.setState({
			gitScore: score
		},()=>{
			this.props.setScoreArray(this.props.number, this.state.gitScore);
		});
	}

	setShowDiv(show){
		this.setState({
			showDiv: show
		});
	}

	setUserText(user){
		this.setState({
			userText: user
		});
		this.setCookie(user)
	}

	getCookie(){
		var decodeName = decodeURIComponent(document.cookie);
		return decodeName;
	}

	setCookie(cvalue){
		document.cookie = cvalue;
	}

	handleCookie(){
		var name = this.getCookie();
		if(name != ""){
			this.searchChild.handleUsername(name)
		}else{
			console.log("no cookie");
			if(name != "" && this.userText != ""){
				this.setCookie(this.state.userText)
			}
		}
	}

	render(){
		var shownComponent = <GitSearch
					number={this.props.number}
					deleteCompareInstance={this.props.deleteCompareInstance}
					setMode={this.setMode}
					setResponse={this.setResponseList}
					setShow={this.setShowDiv}
					setUserText={this.setUserText}
					setScore={this.setScore}
					setStarCount={this.setStarCount}
					setWatcherCount={this.setWatcherCount}
					setForkCount={this.setForkCount} />;

		if(this.state.mode == "display"){
			shownComponent = <GitDisplay
					number={this.props.number}
					deleteCompareInstance={this.props.deleteCompareInstance}
					getResponse={this.state.responseList}
					getShow={this.state.showDiv}
					getScore={this.state.gitScore}
					getForks={this.state.forkCount}
					getStars={this.state.starCount}
					getWatchers={this.state.watcherCount} />;
		}

		return(
			<div className="gitComponent">
				{shownComponent}
			</div>
		)
	}
}