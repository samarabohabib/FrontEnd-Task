import React, { Component } from "react";
import VisibilitySensor from "react-visibility-sensor";

export default class Image extends Component {
  constructor({ loading }) {
    super();

    this.state = {
      renderImage: loading != "lazy" || isNativeImageLazyLoadingSupported()
    };
  }

  render() {
    const { loading, aspectRatio, ...imgAttributes } = this.props;
    const { renderImage } = this.state;

    // We wrap the image in a container div and adjacent spacer that uses the provided aspect ratio to reserve space for the image so that surrounding
    // elements don’t shift around when it eventually loads.
    const wrap = (
      <div>
        <div style={{ paddingTop: `${aspectRatio * 100}%` }} />
        {renderImage ? <img {...imgAttributes} loading={loading} /> : null}
      </div>
    );

    if (renderImage) {
      return wrap;
    } else {
      // we can discard the visibility sensor once the image is loaded
      return (
        <VisibilitySensor active={!renderImage} onChange={this.lazyLoad} partialVisibility>
          {wrap}
        </VisibilitySensor>
      );
    }
  }

  // Renders the image once the container is scrolled into the viewport
  lazyLoad = visible => {
    if (visible) {
      this.setState({ renderImage: true });
    }
  };
}
