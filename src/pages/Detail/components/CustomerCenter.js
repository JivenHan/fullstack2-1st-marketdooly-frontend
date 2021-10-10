import React, { Component } from 'react';
import './CustomerCenter.scss';

export default class CustomerCenter extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
  }

  handleBtn = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    const { isClicked } = this.state;

    return (
      <div className='customerCenter'>
        <img
          className='customerCenterImg'
          alt='customerCenterImg'
          src='/image/customerCenter.png'
        />
        <div className='exchangeAndRefundBtnBox'>
          <span className='exchangeAndRefundBtnTitle'>교환 및 환불 안내</span>
          <span className='exchangeAndRefundBtnDesc'>
            교환 및 환불이 필요하신 경우 고객행복센터로 문의해주세요.
          </span>
          <button
            className='exchangeAndRefundBtn'
            type='button'
            onClick={this.handleBtn}
          >
            {isClicked ? (
              <span className='exchangeAndRefundBtnOpen'>자세히 보기 ∨ </span>
            ) : (
              <span className='exchangeAndRefundBtnClose'>닫기 ∧</span>
            )}
          </button>
        </div>
        {isClicked ? (
          ''
        ) : (
          <img
            className='exchangeAndRefundImg'
            alt='exchangeAndRefundImg'
            src='/image/exchangeAndRefund.png'
          />
        )}
        <div className='deliveryInfo'>
          <span className='deliveryInfoTitle'>배송관련 안내</span>
          <span className='deliveryInfoDesc'>
            배송 과정 중 기상 악화 및 도로교통 상황에 따라 부득이하게 지연
            배송이 발생될 수 있습니다.
          </span>
        </div>
      </div>
    );
  }
}
