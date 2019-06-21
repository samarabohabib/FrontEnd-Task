import React from "react";
import { Button, Modal } from "react-bootstrap";
import GameCard from "./Card";
const axios = require("axios");

export default class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ResultValue: "",
      showModal: false,
      name: "",
      character: "",
      type: ""
    };
  }

  async componentDidMount() {
    const response = await axios.get("https://www.amiiboapi.com/api/amiibo/");
    this.setState({ data: response.data.amiibo });
    console.log(response.data);

    // const response = await fetch("https://www.amiiboapi.com/api/amiibo/");
    // const json = await response.json();
    // this.setState({ data: response.data });
    // console.log(response.data);
  }

  handle = e => {
    this.setState({ ResultValue: e.target.value });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = (name, image, character) => {
    this.setState({ showModal: true, name: name, character: character, image: image });
  };

  getCardData = (image, name, character) => {
    this.setState({ name: name, character: character, image: image });
  };

  render() {
    const { data } = this.state;
    let rawData = this.state.data;

    if (this.state.ResultValue !== "") {
      rawData = rawData.filter(game => game.name.toLowerCase().includes(this.state.ResultValue.toLowerCase()));
    }

    return (
      <>
        <div>
          <div>
            <input type="text" className="input mx-auto" onChange={this.handle} placeholder="  Search..." />
          </div>

          <br />
          <div className="container mt-5" onScroll={this.handleScroll}>
            <div className="masonry">
              {rawData.map(m => (
                <GameCard key={m.tail} {...m} showModal={this.handleShowModal} modalData={this.getCardData} />
              ))}
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Our game description...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Name : {this.state.name}</h3>
            <h3>Character : {this.state.character}</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
