//this component is bio
class About extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="userText" id="aboutContent">
				<h2>About</h2>
				<p>
				Hi! I'm Jolina and I am a 4th year Computer Science: Computer Game Design Major at
				University of California, Santa Cruz. My interests include drawing and creating and playing video games.
				I also like front end design and programming.
				</p>
				<p>
				This website was designed and created by me using Javascript, CSS, HTML, and React library. The process involved
				using the agile development process, GitHub, Sublime Text Editor, and PaintTool Sai.
				</p>
			</div>
		);
	}
}