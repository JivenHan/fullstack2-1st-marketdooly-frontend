import React, { Component } from 'react';
import InquirBoard from './components/board/InquirBoard';
import ReviewBoard from './components/board/ReviewBoard';
import './Detail.scss';

export default class Detail extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/reviewMock.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewData: data.REVIEW_DATA,
        });
      });
  }
  render() {
    return (
      <div>
        <ReviewBoard />
        <InquirBoard />
      </div>
    );
  }
}
