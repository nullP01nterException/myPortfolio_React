class MenuBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="container nav">
				<ul>
					<li id="about"> <IndexLink to="/" activeClassName="active">About Me</IndexLink></li>
					<li id="art"><Link to="art" activeClassName="active">Art</Link></li>
					<li id="code"><Link to="programming" activeClassName="active">Programming</Link></li>
				</ul>
			</div>
		);
	}
}