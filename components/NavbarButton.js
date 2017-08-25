class NavbarButton extends React.Component{
	constructor(props){
		super(props);

		this.state={
			showNavbar: true
		};
		this.toggleNavbar=this.toggleNavbar.bind(this);
	}


	toggleNavbar(){
		this.setState({
			showNavbar: !(this.props.showNavbar)
		},() =>{
			this.props.setShowNavbar(this.state.showNavbar);
		});
	}

	render(){
		return(
			<div>
				<input id="navbarButton" type="image" src="data/images/navbarButton.png" onClick={this.toggleNavbar}></input>
			</div>
		);
	}
}