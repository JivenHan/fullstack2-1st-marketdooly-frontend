import React, { Component } from 'react';
import InquirBoard from './components/board/InquirBoard';
import ReviewBoard from './components/board/ReviewBoard';
import './Detail.scss';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      reviewBox: false,
      qnaBox: false,
      reviewCommentModal: false,
      qnaCommentModal: false,
      reviewData: [],
    };
  }

  componentDidMount() {
    fetch('components/board/reviewMock.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewData: data.REVIEW_DATA[0],
        });
      });
  }

  isValidReviewBox = () => {
    const { reviewBox } = this.state;
    this.setState({
      reviewBox: !reviewBox,
    });
  };

  isValidQnaBox = () => {
    const { qnaBox } = this.state;
    this.setState({
      qnaBox: !qnaBox,
    });
  };

  isValidInputReviewPopup = () => {
    const { reviewCommentModal } = this.state;
    this.setState({
      reviewCommentModal: !reviewCommentModal,
    });
  };

  isValidInputInquirPopup = () => {
    const { qnaCommentModal } = this.state;
    this.setState({
      qnaCommentModal: !qnaCommentModal,
    });
  };

  render() {
    const {
      reviewBox,
      qnaBox,
      qnaCommentModal,
      reviewCommentModal,
      reviewData,
    } = this.state;
    const {
      isValidReviewBox,
      isValidQnaBox,
      isValidInputReviewPopup,
      isValidInputInquirPopup,
    } = this;
    console.log(reviewData);
    return (
      <div class='boardAlign'>
        <ReviewBoard
          reviewData={reviewData}
          reviewBox={reviewBox}
          reviewCommentModal={reviewCommentModal}
          isValidReviewBox={isValidReviewBox}
          isValidInputReviewPopup={isValidInputReviewPopup}
        />
        <InquirBoard
          qnaBox={qnaBox}
          qnaCommentModal={qnaCommentModal}
          isValidQnaBox={isValidQnaBox}
          isValidInputInquirPopup={isValidInputInquirPopup}
        />
      </div>
    );
  }
}
