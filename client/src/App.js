import React, { Component } from "react";
import "./App.css";
import Img from './components/imgComponent/Img'
import Axios from "axios";
class App extends Component {

  state = {
    img: []
  }
//loads content to page
  componentDidMount() {
    Axios.get('/data')
      .then(image => {
        if(image.data === null){
          return
        }else{
          const img = image.data
          this.setState({ img })
        }
      })
  }

  render() {
    return (
      <div>
        {this.state.img.map((image,i) => {
          if(i <=3) {
            return image ? <Img key={i+1} src={image} num={i+1}/> : null
          }else return null 
        })}
      </div>
    );
  }
}

export default App;
