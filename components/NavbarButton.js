/*Toggles display of navbar
  Tooltip that describes button appears on hover
*/

class NavbarButton extends React.Component{
	constructor(props){
		super(props);

		this.state={
			showNavbar: true,
			xPos: 0,
			yPos: 0
		};
		this.toggleNavbar=this.toggleNavbar.bind(this);
		this.mousePos=this.mousePos.bind(this);
	}

	toggleNavbar(){
		this.setState({
			showNavbar: !(this.props.showNavbar)
		},() =>{
			this.props.setShowNavbar(this.state.showNavbar);
		});
	}

	//get position of mouse when hovering over button so tooltip moves with mouse
	mousePos(e){
		this.setState({
			xPos: e.clientX,
			yPos: e.clientY
		});
	}

	render(){
		return(
			<div>
				<input
					id="navbarButton"
					type="image" src="data/images/navbarButton.png"
					onClick={this.toggleNavbar}
					onMouseMove={this.mousePos}></input>

				<div id="tooltip" style={{left:this.state.xPos+15, top:this.state.yPos+30}}>Menu</div>
			</div>
		);
	}
}