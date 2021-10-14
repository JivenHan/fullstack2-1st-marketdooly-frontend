/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import addComma from '../../../utils/addComma';
import './CartAdd.scss';

export default class CartAdd extends Component {
  constructor() {
    super();
    this.state = {
      layerOn: false,
    };
  }

  handleLayer = () => {
    const { layerOn } = this.state;
    this.setState({ layerOn: !layerOn });
  };

  render() {
    const { layerOn } = this.state;
    const {
      observerRef,
      name,
      summary,
      sales_price,
      discount_rate,
      original_price,
      earn_point,
      sales_unit,
      weight_or_capacity,
      delivery_type,
      origin_country,
      packaging,
      package_message,
      notice,
      qauntityMinus,
      quantity,
      qauntityPlus,
      totalPrice,
      totalEarnPoint,
    } = this.props;

    return (
      <div className='productDetailCartAdd' ref={observerRef}>
        <p className='productName'>
          <strong className='nameKor'>{name}</strong>
          <span className='shortDesc'>{summary}</span>
        </p>
        {discount_rate !== 0 ? <p className='productDcInfo'>회원할인가</p> : ''}
        <p className='productPrice'>
          <span className='dcPriceRow'>
            <span className='discount'>
              <span className='dcPrice'>
                {addComma(sales_price)}
                <span className='dcWon'>원</span>
              </span>
              {discount_rate !== 0 ? (
                <span className='discountRate'>
                  {discount_rate}
                  {discount_rate && <span className='dcPer'>%</span>}
                </span>
              ) : (
                ''
              )}
            </span>
            {discount_rate !== 0 ? (
              <span className='originalPriceRow' onClick={this.handleLayer}>
                <span className='originalPrice'>
                  {addComma(original_price)}
                  <span className='won'>원</span>
                </span>
                <img
                  className='dcInfoIcon'
                  alt='물음표'
                  src='https://res.kurly.com/kurly/ico/2021/question_24_24_c999.svg'
                />
              </span>
            ) : (
              ''
            )}
            {layerOn && (
              <div className='dcInfoLayer'>
                <span className='dcInfoLayerTitle'>컬리판매가 기준 할인</span>
                <span className='dcInfoLayerDesc'>
                  동일 품질 상품의 주요 온/오프라인 유통사 가격과 비교하여
                  컬리가 설정한 가격에서 할인된 가격입니다.
                  <br />
                  적용된 할인가는 대표 상품의 가격으로 옵션에 따라 할인 혜택이
                  다를 수 있습니다. 할인 혜택은 당사 사정에 따라 변경될 수
                  있습니다.
                </span>
                <button
                  className='layerBtn'
                  type='button'
                  onClick={this.handleLayer}
                >
                  ×
                </button>
              </div>
            )}
          </span>
          <span className='benefit'>
            <span className='benefitWelcome'>웰컴 5%</span>
            <span className='earnPoint'>
              개당
              <strong className=''> {addComma(earn_point)}원 적립</strong>
            </span>
          </span>
        </p>
        <div className='productInfo'>
          <dl className='productInfoListFirst'>
            <dt className='productInfoListTitleFirst'>판매단위</dt>
            <dd className='productInfoListDescFirst'>{sales_unit}</dd>
          </dl>
          <dl className='productInfoList'>
            <dt className='productInfoListTitle'>중량/용량</dt>
            <dd className='productInfoListDesc'>{weight_or_capacity}</dd>
          </dl>
          <dl className='productInfoList'>
            <dt className='productInfoListTitle'>배송구분</dt>
            <dd className='productInfoListDesc'>{delivery_type}</dd>
          </dl>
          <dl className='productInfoList'>
            <dt className='productInfoListTitle'>원산지</dt>
            <dd className='productInfoListDesc'>{origin_country}</dd>
          </dl>
          <dl className='productInfoList'>
            <dt className='productInfoListTitle'>포장타입</dt>
            <dd className='productInfoListDesc'>
              {packaging}
              <strong className='productInfoListDescStr'>
                {package_message}
              </strong>
            </dd>
          </dl>
          <dl className='productInfoList'>
            <dt className='productInfoListTitle'>안내사항</dt>
            <dd className='productInfoListDesc'>{notice}</dd>
          </dl>
        </div>
        <div className='cartAdd'>
          <div className='cartAddOption'>
            <span className='cartAddQuantity'>구매수량</span>
            <div className='cartAddQuantityOption'>
              <span className='cartAddQuantitySet'>
                <button
                  className='btns minusBtn'
                  type='button'
                  onClick={qauntityMinus}
                />
                <button className='btns btnResult'>{quantity}</button>
                <button
                  className='btns plusBtn'
                  type='button'
                  onClick={qauntityPlus}
                />
              </span>
            </div>
          </div>
          <div className='totalResult'>
            <div className='priceResult'>
              <strong className='totalPriceTitle'>총 상품금액 : </strong>
              <span className='totalPriceIs'>
                <span className='totalPrice'>{addComma(totalPrice)}</span>
                <span className='totalPriceWon'> 원</span>
              </span>
            </div>
            <div className='pointResult'>
              <span className='earnPointIcon'>적립</span>
              <span className='earnPointDesc'>
                구매 시{' '}
                <strong className='earnPointDesc'>
                  {addComma(totalEarnPoint)}원 적립
                </strong>
              </span>
            </div>
          </div>
          <div className='cartAddBtns'>
            <button className='restockAlarmBtn' type='button'>
              재입고 알림
            </button>
            <button
              className='cartAddBtn'
              type='button'
              onClick={this.props.addToCart}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    );
  }
}
