/*this component renders the add/delete buttons;
  parent of the gitCompare component*/
class AddCompareComponent extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<div className="addCompareInstances">
					<button
						className="searchButton"
						id="deleteInstance"
						onClick={this.props.deleteCompareInstance}>-</button>

					<span className="displayCompareInstances">{this.props.getCompareInstances}</span>

					<button
						className="searchButton"
						id="addInstance"
						onClick={this.props.addCompareInstance}>+</button>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}