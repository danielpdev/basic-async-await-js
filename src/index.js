import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class ThenableClass {
  then(resolve, reject) {
    resolve("Test");
  }
  async myAsync() {
    return "Test";
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: ""
    };
    const fct = async () => true;
    fct().then(console.log);
    const waitForIt = async () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000);
      });
      return await promise;
    };
    waitForIt().then(value => {
      console.log(value);
    });

    const thenableObject = new ThenableClass();
    const thenFunction = async () => await thenableObject;
    thenFunction().then(console.log);
    thenableObject.myAsync().then(console.log);
    this.rejectPromise();
  }
  async rejectPromise() {
    try {
      let f = async () => Promise.reject(new Error("reject"));
      let response = await f();
    } catch (err) {
      console.log(err);
    }
  }
  async fct2() {
    await Promise.resolve(false);
  }

  fetchUser = async () => {
    const data = await fetch("https://randomuser.me/api/");
    const result = await data.json();
    this.setState({ imgSrc: result.results[0].picture.large });
  };

  render() {
    return (
      <div className="container">
        <div>
          <img src={this.state.imgSrc} />
          <br />
          <button onClick={this.fetchUser}>Next User</button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
