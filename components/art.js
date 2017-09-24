/*Art page
  Changes picture on ArtDisplay by passing src from ArtTuhmbnail

  Children:
    -ArtThumbnail
    -ArtDisplay
*/
class Art extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			currentSrc: "data/gallery/bloodmoonAkali.png",
			picWidth: "50%"
		};
		this.setCurrentSrc = this.setCurrentSrc.bind(this);
	}

	componentDidMount(){
		document.getElementsByClassName("innerHexagon2")[0].className += " selected";
	}

	setCurrentSrc(src, w){
		this.setState({
			currentSrc: src,
			picWidth: w
		});

		if(document.querySelector(".selected") != null){
			document.querySelector(".selected").classList.remove("selected");
		}
		var thumbnails = document.getElementsByClassName("innerHexagon2");
		for(var i = 0; i < thumbnails.length; i++){
			if(thumbnails[i].style.backgroundImage == "url(\""+src+"\")"){
				thumbnails[i].className += " selected";
			}
		}
	}

	//set the src and which section of the art piece to display in the thumbanil
	render(){
		return(
			<div className="userText" id="artContent">
				<h1>Art</h1>

				<div className="thumbnails">
					<ArtThumbnail
					getSrc="data/gallery/bloodmoonAkali.png"
					getBackgroundPos="61% 18%"
					setCurrentSrc={this.setCurrentSrc}
					getSize="65%"
					picWidth="50%"/>

					<ArtThumbnail
					getSrc="data/gallery/pokemon.png"
					getBackgroundPos="88% 56%"
					setCurrentSrc={this.setCurrentSrc}
					getSize="65%"
					picWidth="50%"/>

					<ArtThumbnail
					getSrc="data/gallery/umi.png"
					getBackgroundPos="55% 21%"
					setCurrentSrc={this.setCurrentSrc}
					getSize="50%"
					picWidth="50%"/>

					<ArtThumbnail
					getSrc="data/gallery/marax.png"
					getBackgroundPos="61% 18%"
					setCurrentSrc={this.setCurrentSrc}
					getSize="55%"
					picWidth="50%"/>

					<ArtThumbnail
					getSrc="data/gallery/dj_monochrome.png"
					getBackgroundPos="-72% 30%"
					setCurrentSrc={this.setCurrentSrc}
					getSize="80%"
					picWidth="60%"/>
				</div>
				
				<ArtDisplay
					getSrc={this.state.currentSrc}
					getWidth={this.state.picWidth} />
			</div>
		);
	}
}