import React, { Component } from 'react';
import addComma from '../../../utils/addComma';
import './BottomLayer.scss';

export default class BottomLayer extends Component {
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
    const { isLayerClicked } = this.state;
    const {
      nameKor,
      qauntityMinus,
      quantity,
      qauntityPlus,
      originalPrice,
      salesPrice,
      totalPrice,
      totalEarnPoint,
    } = this.props;

    return (
      <div className={'detailBottomLayer'}>
        <button className='botLayerPopBtn' onClick={this.handleLayer}>
          상품 선택 {isLayerClicked ? ' ∨' : ' ∧'}
        </button>
        <div
          className={'botLayerContens ' + (isLayerClicked ? '' : 'layerDown')}
        >
          <div className='botLayerSetQuantity'>
            <div className='botLayerProductName'>{nameKor}</div>
            <div className='botLayeQuantitySet'>
              <div className='botLayerBtns'>
                <button
                  className='botBtn botLayerMinusBtn'
                  type='button'
                  onClick={qauntityMinus}
                />
                <button className='botBtn botLayerBtnResult'>{quantity}</button>
                <button
                  className='botBtn botLayerPlusBtn'
                  type='button'
                  onClick={qauntityPlus}
                />
              </div>
              {this.props.discountRate !== 0 ? (
                <span className='botLayerBtnOriginalPrice'>
                  {addComma(originalPrice)} 원
                </span>
              ) : (
                ''
              )}
              <span className='botLayerBtnSalesPrice'>
                {addComma(salesPrice)} 원
              </span>
            </div>
          </div>
          <div className='botLayerPriceResult'>
            <span className='botLayerTotalPriceIs'>총 상품금액 : </span>
            <span className='botLayerTotalPrice'>{addComma(totalPrice)}</span>
            <span className='botLayerTotalPriceWon'> 원</span>
          </div>
          <div className='botLayerPointResult'>
            <span className='earnPointIcon'>적립</span>
            <span className='earnPointDesc'>
              구매 시{' '}
              <strong className='earnPointDesc'>
                {addComma(totalEarnPoint)}원 적립
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
