/*Adds another GitHub compare component by pushing to array in Programming component*/
class AddCompareComponent extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="addCompareInstances">
				<button className="addComponentButton" onClick={this.props.onClick}>
					<i className="glyphicon glyphicon-plus addIcon"></i>
					Add Repo
				</button>
			</div>
		)
	}
}