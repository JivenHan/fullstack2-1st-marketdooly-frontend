import React, { Component } from 'react';
import InquirBoard from './components/board/InquirBoard';
import ReviewBoard from './components/board/ReviewBoard';
import './Detail.scss';

export default class Detail extends Component {
  render() {
    return (
      <div>
        <ReviewBoard />
        <InquirBoard />
      </div>
    );
  }
}
