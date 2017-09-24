/*This component renders and animates the navigation bar and decoration beam behind the tabs
*/

class MenuBar extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			activeTab: "about"
		};

		this.redirect=this.redirect.bind(this);
		this.animateIn=this.animateIn.bind(this);
		this.animateOut=this.animateOut.bind(this);
		this.animateAbout=this.animateAbout.bind(this);
		this.animateArt=this.animateArt.bind(this);
		this.animateProgramming=this.animateProgramming.bind(this);
		this.checkActiveTab=this.checkActiveTab.bind(this);
	}

	//check path to activate correct tab if browser is refreshed
	componentDidMount(){
		//returns top of router history stack
		var currPath = this.props.history.getCurrentLocation().pathname;
		var path = currPath.substring(1, currPath.length);
		this.setState({
			activeTab: path
		});

		switch(path){
			case "":
				document.getElementById("about").className += ' activeTab';
				this.animateIn("active","in","in");
				break;
			case "art":
				document.getElementById("art").className += ' activeTab';
				this.animateIn("in","active","in");
				break;
			case "programming":
				document.getElementById("code").className += ' activeTab';
				this.animateIn("in","in","active");
				break;
		}
	}

	checkActiveTab(){
		switch(this.state.activeTab){
			case "":
				this.animateIn("active","in","in");
				break;
			case "about":
				this.animateIn("active","in","in");
				break;
			case "art":
				this.animateIn("in","active","in");
				break;
			case "programming":
				this.animateIn("in","in","active");
				break;
			case "code":
				this.animateIn("in","in","active");
				break;
		}
	}

	//changes active tab on click
	redirect(link,id){
		this.props.history.push(link);

		switch(id){
			case "about":
				this.animateAbout("active", 200);
				this.animateArt("in", 200);
				this.animateProgramming("in",200);
				break;
			case "art":
				this.animateAbout("in", 200);
				this.animateArt("active", 200);
				this.animateProgramming("in",200);
				break;
			case "code":
				this.animateAbout("in", 200);
				this.animateArt("in", 200);
				this.animateProgramming("active",200);
				break;
		}

		if(document.querySelector(".activeTab") != null){
			document.querySelector(".activeTab").classList.remove("activeTab");
		}
		document.getElementById(id).className += ' activeTab';

		this.setState({
			activeTab: id
		}, () =>{
			this.props.setShowNavbar(false);
		});
	}

	animateIn(aboutDir, artDir, programmingDir){
		$("#beam").animate({top:'0px', left:'100px'},500, function(){
			this.animateAbout(aboutDir, 500);
			this.animateArt(artDir, 750);
			this.animateProgramming(programmingDir, 1000);
		}.bind(this));
	}

	animateOut(){
		this.animateAbout("out", 500);
		this.animateArt("out", 750);
		this.animateProgramming("out", 1000);
	}

	animateAbout(direction, time){
		if(direction == "in"){
			$("#about").animate({left:'-600px'},time);
		}else if(direction == "out"){
			$("#about").animate({left:'-1000px'},time);
		}else if(direction == "active"){
			$("#about").animate({left:'-600px'},time);
		}
	}

	animateArt(direction, time){
		if(direction == "in"){
			$("#art").animate({left:'-550px'},time);
		}else if(direction == "out"){
			$("#art").animate({left:'-1000px'},time);
		}else if(direction == "active"){
			$("#art").animate({left:'-550px'},time);
		}
	}

	animateProgramming(direction, time){
		if(direction == "in"){
			$("#code").animate({left:'-500px'},time);
		}else if(direction == "out"){
			$("#code").animate({left:'-1000px'},time, function(){
				$("#beam").animate({top:-(document.getElementById("beam").clientHeight), left:'-100px'},400);
			});
		}else if(direction == "active"){
			$("#code").animate({left:'-500px'},time);
		}
	}

	render(){
		return(
			<div id="navbar">
				<div id="beam"></div>

				<div className="tab" id="about" onClick={() => this.redirect("/", "about")}>
					<IndexLink to="/" className="routerLink" activeClassName="active">About</IndexLink>
				</div>

				<div className="tab" id="art" onClick={() => this.redirect("/art", "art")}>
					<Link to="art" className="routerLink" activeClassName="active">Art</Link>
				</div>

				<div className="tab" id="code" onClick={() => this.redirect("/programming", "code")}>
					<Link to="programming" className="routerLink" activeClassName="active">Programming</Link>
				</div>
			</div>
		);
	}
}