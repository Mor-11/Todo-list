import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    coincidence: "",
  };

  onLabelChange = (e) => {
    const coincidence = e.target.value;
    this.setState({
      coincidence,
    });
    this.props.onLabelChange(coincidence);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.coincidence}
        onChange={this.onLabelChange}
      />
    );
  }
}
