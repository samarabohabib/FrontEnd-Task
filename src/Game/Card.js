import React from "react";

export default class GameCard extends React.Component {
  render() {
    const { image, name, character, type } = this.props;
    return (
      <>
        <div className="picture con">
          <img className="image" src={image} alt="" />
          <div className="overlay">
            <h3>
              <a className="link" title="" onClick={() => this.props.showModal(name, character, type)}>
                {name}
              </a>
              <br />
            </h3>
          </div>
        </div>
      </>
    );
  }
}
