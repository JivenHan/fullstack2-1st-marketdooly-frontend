import React, { Component } from 'react';
import './DetailBottomLayer.scss';

export default class DetailBottomLayer extends Component {
  constructor() {
    super();
    this.state = {
      isLayerClicked: false,
    };
  }

  handleLayer = () => {
    const { isLayerClicked } = this.state;
    this.setState({ isLayerClicked: !isLayerClicked });
  };

  render() {
    const { isLayerClicked, isBottomLayerUp } = this.state;

    return (
      <div
        className={'detailBottomLayer' + (isBottomLayerUp ? 'layerHide' : '')}
      >
        <button className='botLayerPopBtn' onClick={this.handleLayer}>
          상품 선택 {isLayerClicked ? '∨' : '∧'}
        </button>
        <div
          className={'botLayerContens ' + (isLayerClicked ? '' : 'layerDown')}
        >
          <div className='botLayerSetQuantaty'>
            <div className='botLayerProductName'>{this.props.nameKor}</div>
            <div className='botLayeQuantatySet'>
              <div className='botLayerBtns'>
                <button
                  className='botBtn botLayerMinusBtn'
                  type='button'
                  onClick={this.props.qauntatyMinus}
                />
                <button className='botBtn botLayerBtnResult'>
                  {this.props.quantaty}
                </button>
                <button
                  className='botBtn botLayerPlusBtn'
                  type='button'
                  onClick={this.props.qauntatyPlus}
                />
              </div>
              <span className='botLayerBtnOriginalPrice'>
                {this.props.originalPrice} 원
              </span>
              <span className='botLayerBtnSalesPrice'>
                {this.props.salesPrice} 원
              </span>
            </div>
          </div>
          <div className='botLayerPriceResult'>
            <span className='botLayerTotalPriceIs'>총 상품금액 : </span>
            <span className='botLayerTotalPrice'>{this.props.totalPrice}</span>
            <span className='botLayerTotalPriceWon'> 원</span>
          </div>
          <div className='botLayerPointResult'>
            <span className='earnPointIcon'>적립</span>
            <span className='earnPointDesc'>
              구매 시{' '}
              <strong className='earnPointDesc'>
                {this.props.totalEarnPoint}원 적립
              </strong>
            </span>
          </div>
          <div className='botLayerCartBtns'>
            <button className='botLayerRestockAlarmBtn'>재입고 알림</button>
            <button className='botLayerCartAddBtn'>장바구니 담기</button>
          </div>
        </div>
      </div>
    );
  }
}
