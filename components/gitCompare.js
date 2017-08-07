//renders both gitSearch and gitDisplay
class GitCompare extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			responseList: [],
			showDiv: false,
			isSuccess: false,
			userText: "",
			gitScore: [],
			starCount: [],
			watcherCount: [],
			forkCount: []
		};

		this.setScore = this.setScore.bind(this);
		this.setResponseList = this.setResponseList.bind(this);
		this.setShowDiv = this.setShowDiv.bind(this);
		this.setIsSuccess = this.setIsSuccess.bind(this);
		this.setUserText = this.setUserText.bind(this);
		this.setCookie = this.setCookie.bind(this);

		this.setStarCount = this.setStarCount.bind(this);
		this.setForkCount = this.setForkCount.bind(this);
		this.setWatcherCount = this.setWatcherCount.bind(this);
	}

	/****causing: Warning: performUpdateIfNecessary: Unexpected batch number (current 10, pending 1)*****/
	/*componentDidMount(){
		this.handleCookie()
	}*/

	setResponseList(response){
		this.setState({
			responseList: response
		});
		this.props.setResponse(this.state.responseList);
		this.props.setObjectKey(this.props.number);
	}

	setStarCount(num){
		this.setState({
			starCount: num
		});
		this.props.setStar(this.state.starCount);
	}

	setWatcherCount(num){
		this.setState({
			watcherCount: num
		});
		this.props.setWatcher(this.state.watcherCount);
	}

	setForkCount(num){
		this.setState({
			forkCount: num
		});
		this.props.setFork(this.state.forkCount);
	}

	setIsSuccess(success){
		this.setState({
			isSuccess: success
		});
	}

	setScore(score){
		this.setState({
			gitScore: score
		});
		this.props.setGitScore(this.state.gitScore);
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
		return(
			<div className="compareDiv">
				<GitSearch
					setResponse={this.setResponseList}
					setShow={this.setShowDiv}
					setSuccess={this.setIsSuccess}
					setUserText={this.setUserText}
					setScore={this.setScore}
					setStarCount={this.setStarCount}
					setWatcherCount={this.setWatcherCount}
					setForkCount={this.setForkCount}
					ref={(child) => {this.searchChild = child}} />

				<GitDisplay
					getResponse={this.state.responseList}
					getShow={this.state.showDiv}
					getSuccess={this.state.isSuccess} />
			</div>
		)
	}
}