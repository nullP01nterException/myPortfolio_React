//this component is for art
class Art extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="artContent userText">
				<h1>Art</h1>
				<img className="picture" src="data/gallery/bloodmoon akali.png"></img>
				<img className="picture" src="data/gallery/umi.png"></img>
			</div>
		);
	}
}