import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ShortUrl } from "./components/ShortUrl";
import axios from "axios";

class App extends Component {
  state = {
    inputUrl: "",
    responseDate: []
  };

  handleSubmit = event => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/api/url/shorten",
      headers: { "content-type": "application/json" },
      data: {
        longUrl: this.state.inputUrl
      }
    })
      .then(res =>
        this.setState({
          responseDate: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({ inputUrl: event.target.value });
  };
  render() {
    const { responseDate } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Enter Long URL</label>
            <input
              type="text"
              value={this.state.inputUrl}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter Url to be Shorten"
            />
          </div>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleSubmit}
          >
            Shorten Url
          </button>
          {responseDate > 0 ? (
            <ShortUrl shortenUrl="#" />
          ) : (
            <ShortUrl shortenUrl={this.state.responseDate.shortUrl} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
