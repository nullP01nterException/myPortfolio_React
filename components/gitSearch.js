class GitSearch extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			inputText: "search user...",
			user: "",
			showDiv: false,
			isSuccess: false,
			score: 0,
			forkCount: 0,
			starCount: 0,
			watcherCount: 0
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.getUsername = this.getUsername.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	getScore(initScore){
		var xmlHttp = new XMLHttpRequest();

    	xmlHttp.onreadystatechange = function() { 
        	if (xmlHttp.readyState == 4){
        		var XMLResponse = JSON.parse(xmlHttp.responseText);
        		if(xmlHttp.status == 200){
            		var tempScore = 0;
            		var star = 0;
            		var fork = 0;
            		var watcher = 0;
            		for(var i = 0; i < XMLResponse.length; i++){
            			tempScore+=(1.5*(XMLResponse[i].forks_count + XMLResponse[i].stargazers_count + XMLResponse[i].watchers_count));
            			star+=XMLResponse[i].stargazers_count;
            			fork+=XMLResponse[i].forks_count;
            			watcher+=XMLResponse[i].watchers_count;
            		}

            		this.setState({
            			score: this.state.score + initScore + tempScore,
            			scoreResponse: XMLResponse,
            			starCount: star,
            			forkCount: fork,
            			watcherCount: watcher
            		});
            		this.props.setScore(this.state.score);
            		this.props.setStarCount(this.state.starCount);
            		this.props.setForkCount(this.state.forkCount);
            		this.props.setWatcherCount(this.state.watcherCount);
				}else{
					this.setState({
            			score: 0
            		});
            		this.props.setScore(this.state.score);
				}		
        	}else{
        		this.setState({
            			score: 0
            		});
            	this.props.setScore(this.state.score);
        	}
        }.bind(this);

        this.props.setScore(this.state.score);
    	xmlHttp.open("GET", this.state.response.repos_url, true);
    	xmlHttp.send(null);
	}

	getUsername(e){
		this.setState({
			inputText: e.target.value,
			user: e.target.value,
			response: []
		});
	}

	handleKeyPress(e){
		if(e.key==="Enter"){
			this.handleUsername("")
		}
	}

	handleUsername(cookieUser){
		this.setState({
			showDiv: true
		});

		var xmlHttp = new XMLHttpRequest();

    	xmlHttp.onreadystatechange = function() { 
        	if (xmlHttp.readyState == 4){
        		var XMLResponse = JSON.parse(xmlHttp.responseText);
        		if(xmlHttp.status == 200){
            		this.setState({
						inputText: "",
						response: XMLResponse,
						isSuccess: true,
						showDiv: true
					});
					this.getScore(XMLResponse.public_repos + XMLResponse.followers);
				}else{
					this.setState({
						inputText: "",
						response: XMLResponse,
						showDiv: false,
						isSuccess: false
					});
				}
				this.props.setResponse(this.state.response);
				this.props.setSuccess(this.state.isSuccess);
				this.props.setShow(this.state.showDiv);
				
        	}else{
        		//var XMLResponse = JSON.parse(xmlHttp.responseText);
        		this.setState({
					inputText: "",
					response: [],
					showDiv: false,
					isSuccess: false
				});
				this.props.setResponse(this.state.response);
				this.props.setSuccess(this.state.isSuccess);
				this.props.setShow(this.state.showDiv);
        	}
    	}.bind(this);
    	if(cookieUser == ""){
    		xmlHttp.open("GET", "https://api.github.com/users/"+this.state.user, true); // true for asynchronous
    		this.props.setUserText(this.state.inputText);
    	}else{
    		xmlHttp.open("GET", "https://api.github.com/users/"+cookieUser, true);
    		console.log(cookieUser);
    	}
    	xmlHttp.send(null);

    	this.props.setShow(this.state.showDiv);
	}

	onFocus(){
		if(this.state.inputText=="search user..."){
    		this.setState({
    			inputText: ""
    		})
    	}
	}

	onBlur(){
		if(this.state.inputText==""){
			this.setState({
    			inputText: "search user..."
    		})
    	}
	}

	render(){
		return(
			<div className="wrap">
				<input type="text" ref="searchbox" className="search" id="searchBox" value={this.state.inputText}
				onClick={this.onFocus} onBlur={this.onBlur} onChange={this.getUsername} onKeyPress={this.handleKeyPress}></input>

				<button className="searchButton" id="searchButton" onClick={() => this.handleUsername("")}>
					<i className="glyphicon glyphicon-search"></i>
				</button>
			</div>
		)
	}
}