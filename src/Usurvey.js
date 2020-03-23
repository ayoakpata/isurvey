import React, { Component } from "react";
var firebase = require("firebase");
var uuid = require("uuid");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBmo0Fh8qMlTN96h2uicW_AJF-_OymT-o8",
  authDomain: "isurvey-acaa8.firebaseapp.com",
  databaseURL: "https://isurvey-acaa8.firebaseio.com",
  projectId: "isurvey-acaa8",
  storageBucket: "isurvey-acaa8.appspot.com",
  messagingSenderId: "559451356113",
  appId: "1:559451356113:web:3813f185647ffbc68cfef0",
  measurementId: "G-XER1BQEQTE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Usurvey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({ studentName: studentName }, function() {
      console.log(this.state);
    });
  }
  answerSelected(event) {
    var answers = this.state.answers;
    if (event.target.name === "answer1") {
      answers.answer1 = event.target.value;
    } else if (event.target.name === "answer2") {
      answers.answer2 = event.target.value;
    } else if (event.target.name === "answer3") {
      answers.answer3 = event.target.value;
    }

    this.setState({ answers: answers }, function() {
      console.log(this.state);
    });
  }

  questionSubmit() {
    firebase
      .database()
      .ref("isurvey/" + this.state.uid)
      .set({
        studentName: this.state.studentName,
        answers: this.state.answers
      });
    this.setState({ isSubmitted: true });
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: ""
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render() {
    var studentName;
    var questions;

    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      studentName = (
        <div>
          <h1>Hey learner, what is your name: </h1>
          <form onSubmit={this.nameSubmit}>
            <input
              className="name"
              type="text"
              placeholder="Enter your name"
              ref="name"
            />
          </form>
        </div>
      );
      questions = "";
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === false
    ) {
      studentName = <h1>welcome to ask me, {this.state.studentName}</h1>;
      questions = (
        <div>
          <h2>choose answers for the following qusetions: </h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label>Favourite category of courses: </label> <br />
              <input
                type="radio"
                name="answer1"
                value="Technology"
                onChange={this.answerSelected}
              />
              Technology
              <input
                type="radio"
                name="answer1"
                value="Architecture"
                onChange={this.answerSelected}
              />
              Architecture
              <input
                type="radio"
                name="answer1"
                value="Public Law"
                onChange={this.answerSelected}
              />
              Public Law
            </div>
            <div className="card">
              <label>you are a: </label> <br />
              <input
                type="radio"
                name="answer2"
                value="student"
                onChange={this.answerSelected}
              />
              student
              <input
                type="radio"
                name="answer2"
                value="freelancer"
                onChange={this.answerSelected}
              />
              freelancer
              <input
                type="radio"
                name="answer2"
                value="expert"
                onChange={this.answerSelected}
              />
              expert
            </div>
            <div className="card">
              <label>you like online learning? </label> <br />
              <input
                type="radio"
                name="answer3"
                value="yes"
                onChange={this.answerSelected}
              />
              yes
              <input
                type="radio"
                name="answer3"
                value="no"
                onChange={this.answerSelected}
              />
              no
              <input
                type="radio"
                name="answer3"
                value="undecided"
                onChange={this.answerSelected}
              />
              undecided
            </div>
            <input className="feedback-button" type="submit" value="submit" />
          </form>
        </div>
      );
    } else if (this.state.isSubmitted === true) {
      studentName = <h1>Thanks {this.state.studentName}</h1>;
    }

    return (
      <div>
        {studentName}
        ------------------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
