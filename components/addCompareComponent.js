/*this component renders the add/delete buttons;
  parent of the gitCompare component*/
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