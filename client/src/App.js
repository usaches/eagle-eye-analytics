import React, { Component } from "react";
import { Navbar, NavItem, Col, Row } from "react-materialize";
import "./App.css";
import Img from './components/imgComponent/Img'
import Axios from "axios";
// import homePage from "./pages/homePage";

class App extends Component {

  state = {
    img: []
  }
  //loads content to page
  componentDidMount() {
    Axios.get('/data')
      .then(image => {
        if (image.data === null) {
          return
        } else {
          const img = image.data
          this.setState({ img })
        }
      })
  }
  //renders images to page
  render() {
    return (
      <div>

        <Row>
          <Col s={12}>
            <Navbar className="black" brand='Eagle Eye Analytics' right>
              <NavItem onClick={() => console.log('test click')}><span className="red-text">WHAT</span></NavItem>
              <NavItem href='why.html'><span className="red-text">WHY</span></NavItem>
              <NavItem href='who.html'><span className="red-text">WHO</span></NavItem>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col s={12} className="mainBody">

          </Col>
        </Row>

        {/* {this.state.img.map((image, i) => {
          //only renders 4 videos
          if (i <= 3) {
            return image ? <Img key={i + 1} src={image} num={i + 1} /> : null
          } else return null
        })} */}

      </div>
    );
  }
}

export default App;
