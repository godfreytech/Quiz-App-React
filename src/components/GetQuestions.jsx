import React, { Component } from "react";

export class GetQuestions extends Component {
  constructor(props) {
    super(props);

    // this.nextQuestion = this.nextQuestion.bind(this);
    this.index = 1;
    this.state = {
      question: "Loading..",
      questionsList: [],
      incorrectAnswers: [],
      correctAnswer: [],
      choices: []
    };
  }

  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(response => response.json())
      .then(data => {
        console.log(data.results);

        //setting state of the first question[0]
        this.setState({
          question: data.results[0].question
        });

        // pushing all questions in questionsList[]
        for (let item in data.results) {
          this.setState({
            questionsList: [
              ...this.state.questionsList,
              data.results[item].question
            ]
          });
        }

        //getting incorrectAnswers and correctAnswer and pushing them in the choices[]
        for (let item in data.results) {
          this.setState({
            incorrectAnswers: [
              ...this.state.incorrectAnswers,
              data.results[item].incorrect_answers
            ],
            correctAnswer: [
              ...this.state.correctAnswer,
              data.results[item].correct_answer
            ]
          });
        }

        for (let item in data.results) {
          this.setState({
            choices: [
              ...this.state.choices,
              this.state.incorrectAnswers[item].concat(
                this.state.correctAnswer[item]
              )
            ]
          });
        }

        console.log(this.state.choices);

        return null;
      });
  }

  // nextQuestion() {
  //   if (this.state.questionsList.length) {
  //     this.setState({
  //       question: this.state.questionsList[this.index],
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
