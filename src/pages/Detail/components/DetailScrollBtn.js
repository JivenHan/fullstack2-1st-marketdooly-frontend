import React, { Component } from 'react';
import './DetailScrollBtn.scss';

export default class DetailScrollBtn extends Component {
  render() {
    return (
      <div className='scrollBtns'>
        <button
          className='scrollBtn'
          type='button'
          onClick={this.props.clickToDetailDesc}
        >
          상품설명
        </button>
        <button
          className='scrollBtn'
          type='button'
          onClick={this.props.clickToDetailInfo}
        >
          상세정보
        </button>
        <button
          className='scrollBtn'
          type='button'
          onClick={this.props.clickToReviews}
        >
          후기
          <span className='productReviewCount'>({this.props.reviews})</span>
        </button>
        <button
          className='scrollBtn'
          type='button'
          onClick={this.props.clickToInquiry}
        >
          문의
        </button>
      </div>
    );
  }
}
