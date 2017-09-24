/*Displays art by get current src from Art component*/

class ArtDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="artDisplay">
				<img className="picture"
					src={this.props.getSrc}
					style={{width: this.props.getWidth}}></img>
			</div>
		);
	}
}