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
	}

	render(){
		return(
			<div>
				<MenuBar />
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