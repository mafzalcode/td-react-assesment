import React, { Component } from "react";
import { detectSums } from "./utils";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      result: "",
      error: "Write something (comma-separated)",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userInput } = this.state;
    // Split userInput into an array of numbers and trim any whitespace
    const inputArray = userInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10));

    // Check if inputArray is not an array or has less than 2 numbers
    if (!Array.isArray(inputArray) || inputArray.length < 2) {
      this.setState({ error: "Please enter at least two numbers" });
    }
    // Check if any item in inputArray is not a number
    else if (inputArray.some(isNaN)) {
      this.setState({ error: "Please enter only numbers" });
    }
    // If inputArray is an array of at least 2 numbers with no non-numeric items
    else {
      const result = detectSums(inputArray);

      if (result.length === 0) {
        this.setState({ error: "No matches found" });
      }
      else {
        this.setState({ result: JSON.stringify(result), error: "" });
      }
    }
  }

  render() {
    const { userInput, result, error } = this.state;

    return (
      <div className="App">
        <form className="App-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.userInput}
            onChange={this.handleChange}
          />
          {!error && (
            <p>
              <span>
                Result for input '{userInput}' is '{result}'
              </span>
            </p>
          )}
          {error && <p className="App-error">{error}</p>}
        </form>
      </div>
    );
  }
}

export default App;
