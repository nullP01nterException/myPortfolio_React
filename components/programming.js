class Programming extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			project: "",
			projectMode: false
		};

		this.showProject = this.showProject.bind(this);
	}

	componentDidUpdate(){
		var frame = document.getElementById("gameIFrame");
		if(frame != null){
			var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
			frameDoc.body.setAttribute("text-align","center");
		}
	}

	showProject(id){
		this.setState({
			project: id
		});

		if(id != ""){
			this.setState({
				projectMode: true
			});
			document.getElementById("backToTabs").style.display="block";
			document.getElementById("navbar").style.display="none";
			document.getElementById("navbarButton").style.display="none";
		}else{
			this.setState({
				projectMode: false
			});
			document.getElementById("backToTabs").style.display="none";
			document.getElementById("navbar").style.display="block";
			document.getElementById("navbarButton").style.display="block";
		}
	}

	render(){
		var renderProject=null;

		switch(this.state.project){
			case "gitScraper":
				renderProject = <GitScraper />;
				break;
			case "symbiosis":
				renderProject = <iframe id="gameIFrame" src="https://rawgit.com/nullP01nterException/cm120-project/master/code/index.html"></iframe>;
				break;
		}

		return(
			<div id="programmingTab">
			<button id="backToTabs" onClick={()=>{this.showProject("")}}>Back To Projects</button>
				{renderProject}

				<ProjectThumbnail 
					onClick={this.showProject}
					getProjectMode={this.state.projectMode}
					projectId="gitScraper"
					getSrc="../data/images/gitscraper.png"
					getTitle="Git Scraper (2017)"
					getDescription="This program searches for the user's requested GitHub repository and displays
						information about it. It gives each repository a score based on repos, followers, stars, forks, 
						and watchers. Multiple searches can be sorted by score in descending order." />

				<ProjectThumbnail 
					onClick={this.showProject}
					getProjectMode={this.state.projectMode}
					projectId="symbiosis"
					getSrc="../data/images/symbiosis.png"
					getTitle="Symbiosis (2016)"
					getDescription="This game is about the bleaching of the Great Barrier Reef. 
						The player takes on the role of zooxanthellae who shares a symbiotic relationship
						with a dying reef and must take action to prevent its imminent destruction. 
						Created in a team with Richard Harker, Nicole Maines, and Tommy Milne-Jones." />
			</div>
		);
	}
}