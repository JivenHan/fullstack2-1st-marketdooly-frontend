import React, { Component } from 'react';
import './DetailScrollBtn.scss';

export default class DetailScrollBtn extends Component {
  constructor() {
    super();
    this.state = {
      isClicked1: false,
      isClicked2: false,
      isClicked3: false,
      isClicked4: false,
    };
  }

  callTwoFunc1 = () => {
    this.setState({
      isClicked1: true,
      isClicked2: false,
      isClicked3: false,
      isClicked4: false,
    });
    this.props.clickToDetailDesc();
  };

  callTwoFunc2 = () => {
    this.setState({
      isClicked1: false,
      isClicked2: true,
      isClicked3: false,
      isClicked4: false,
    });
    this.props.clickToDetailInfo();
  };

  callTwoFunc3 = () => {
    this.setState({
      isClicked1: false,
      isClicked2: false,
      isClicked3: true,
      isClicked4: false,
    });
    this.props.clickToReviews();
  };

  callTwoFunc4 = () => {
    this.setState({
      isClicked1: false,
      isClicked2: false,
      isClicked3: false,
      isClicked4: true,
    });
    this.props.clickToInquiry();
  };

  handleClickBtn = () => {};

  render() {
    const { isClicked1, isClicked2, isClicked3, isClicked4 } = this.state;

    return (
      <div className='scrollBtns'>
        <button
          className={'scrollBtn ' + (isClicked1 ? 'clicked' : '')}
          type='button'
          onClick={this.callTwoFunc1}
        >
          상품설명
        </button>
        <button
          className={'scrollBtn ' + (isClicked2 ? 'clicked' : '')}
          type='button'
          onClick={this.callTwoFunc2}
        >
          상세정보
        </button>
        <button
          className={'scrollBtn ' + (isClicked3 ? 'clicked' : '')}
          type='button'
          onClick={this.callTwoFunc3}
        >
          후기
          <span className='productReviewCount'>({this.props.reviews})</span>
        </button>
        <button
          className={'scrollBtn ' + (isClicked4 ? 'clicked' : '')}
          type='button'
          onClick={this.callTwoFunc4}
        >
          문의
        </button>
      </div>
    );
  }
}
