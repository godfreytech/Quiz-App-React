import React, { Component } from "react";

export class GetQuestions extends Component {
  constructor(props) {
    super(props);

    // this.nextQuestion = this.nextQuestion.bind(this);
    this.index = 1;
    this.state = {
      question: "loading..",
      questionsList: [],
      choices: []
    };
  }

  componentDidMount() {
    console.log(this.state.questionsList);
    fetch("https://opentdb.com/api.php?amount=10")
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        this.setState({
          question: data.results[0].question
        });
        for (let item in data.results) {
          this.setState({
            questionsList: [
              ...this.state.questionsList,
              data.results[item].question
            ]
          });
        }
        return this.state.questionsList;
        // });
      });
  }

  // nextQuestion() {
  //   if (this.state.questionsList.length) {
  //     this.setState({
  //       question: this.state.questionsList[this.index]
  //     });
  //     this.index++;
  //   }
  // }

  render() {
    return (
      <div>
        <h2>{this.state.question}</h2>
        {/* <button onClick={this.nextQuestion}>Next</button> */}
      </div>
    );
  }
}

export default GetQuestions;
