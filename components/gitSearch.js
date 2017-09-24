/*Searches for GitHub Repo
  Passes data to Programming component to be displayed in GitDisplay
*/

class GitSearch extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			inputText: "search GitHub repo...",
			user: "",
			showDiv: false,
			score: 0,
			forkCount: 0,
			starCount: 0,
			watcherCount: 0,
			key: 0
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.getUsername = this.getUsername.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	//makes AJAX call to user's list of GitHub repos
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

            		//set local response and score -> pass to parent -> increment key -> pass to parent
            		this.setState({
            			score: this.state.score + initScore + tempScore,
            			scoreResponse: XMLResponse,
            			starCount: star,
            			forkCount: fork,
            			watcherCount: watcher
            		}, () =>{
            			this.props.setScore(this.state.score);
						this.props.setStarCount(this.state.starCount);
            			this.props.setForkCount(this.state.forkCount);
            			this.props.setWatcherCount(this.state.watcherCount);
            			this.props.setMode("display");

            			this.setState({
            				key: this.state.key+1
            			});
            		});
				}else{
					this.setState({
            			score: 0
            		});
				}		
        	}else{
        		this.setState({
            			score: 0
            		});
        	}
        }.bind(this);

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

	//initial AJAX call to GitHub api
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
						showDiv: true
					}, ()=>{
						//makes AJAX call to calculate score on successful call
						this.getScore(XMLResponse.public_repos + XMLResponse.followers);

						this.props.setResponse(this.state.response);
						this.props.setShow(this.state.showDiv);
					});
				}else{
					//if call is unsuccessful (status != 200)...
					this.setState({
						inputText: "",
						response: XMLResponse,
						showDiv: false
					},()=>{
						this.props.setMode("display");
						this.props.setShow(this.state.showDiv);
					});
				}
				this.props.setResponse(this.state.response);
        	}else{
        		this.setState({
					inputText: "",
					response: [],
					showDiv: false
				});
        	}
    	}.bind(this);
    	if(cookieUser == ""){
    		xmlHttp.open("GET", "https://api.github.com/users/"+this.state.user, true); // true for asynchronous
    	}else{
    		xmlHttp.open("GET", "https://api.github.com/users/"+cookieUser, true);
    		console.log(cookieUser);
    	}
    	xmlHttp.send(null);
	}

	onFocus(){
		if(this.state.inputText=="search GitHub repo..."){
    		this.setState({
    			inputText: ""
    		})
    	}
	}

	onBlur(){
		if(this.state.inputText==""){
			this.setState({
    			inputText: "search GitHub repo..."
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

				<button className="deleteButton" >
					<i className="glyphicon glyphicon-trash" onClick={() => this.props.deleteCompareInstance(this.props.number)}></i>
				</button>
			</div>
		)
	}
}