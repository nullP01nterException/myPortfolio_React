/*Entry point of website

Children:
  -Navbar
  -About
  -Art
  -Programming
*/

//automatically attaches ReactRouter prefix
var {Router,
	Route,
	IndexRoute,
	IndexLink,
	hashHistory,
	Link} = ReactRouter;

class Main extends React.Component{
	constructor(props){
		super(props);

		this.state={
			showNavbar: true
		};

		this.setShowNavbar=this.setShowNavbar.bind(this);
	}

	setShowNavbar(show){
		this.setState({
			showNavbar: show
		},()=>{
			if(this.state.showNavbar){
				this.refs.navbar.checkActiveTab();
			}else{
				setTimeout(this.refs.navbar.animateOut,500);
			}
		});
	}

	render(){
		return(
			<div id="main">
				<NavbarButton
					showNavbar={this.state.showNavbar}
					setShowNavbar={this.setShowNavbar}/>

				<div>
					<MenuBar
						ref="navbar"
						history={ReactRouter.hashHistory} 
						showNavbar={this.state.showNavbar}
						setShowNavbar={this.setShowNavbar}/>
				</div>

				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={ReactRouter.hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={About}/>
			<Route path="art" component={Art}/>
			<Route path="programming" component={Programming}/>
		</Route>
	</Router>,
	document.getElementById("container")
);