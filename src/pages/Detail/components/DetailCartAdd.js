/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './DetailCartAdd.scss';

export default class DetailCartAdd extends Component {
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
    return (
      <div className='detailMainContainer'>
        <img
          className='productThumbImg'
          alt='productThumbImg'
          src={this.props.thumbImg}
        />
        <div className='productDetailCartAdd'>
          <p className='productName'>
            <strong className='nameKor'>{this.props.nameKor}</strong>
            <span className='shortDesc'>{this.props.shortDesc}</span>
          </p>
          <p className='productDcInfo'>{this.props.dcInfo}</p>
          <p className='productPrice'>
            <span className='dcPriceRow'>
              <span className='discount'>
                <span className='dcPrice'>
                  {this.props.salesPrice}
                  <span className='dcWon'>원</span>
                </span>
                <span className='dcPercent'>
                  {this.props.dcPercent}
                  <span className='dcPer'>%</span>
                </span>
              </span>
              <span className='originalPriceRow' onClick={this.handleLayer}>
                <span className='originalPrice'>
                  {this.props.originalPrice}
                  <span className='won'>원</span>
                </span>
                <img
                  className='dcInfoIcon'
                  alt='물음표'
                  src='https://res.kurly.com/kurly/ico/2021/question_24_24_c999.svg'
                />
              </span>
              <div className={this.state.layerOn ? 'dcInfoLayer' : 'layerOff'}>
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
            </span>
            <span className='benefit'>
              <span className='benefitWelcome'>웰컴 5%</span>
              <span className='earnPoint'>
                개당
                <strong className=''> {this.props.earnPoint}원 적립</strong>
              </span>
            </span>
          </p>
          <div className='productInfo'>
            <dl className='productInfoListFirst'>
              <dt className='productInfoListTitleFirst'>판매단위</dt>
              <dd className='productInfoListDescFirst'>
                {this.props.saleUnit}
              </dd>
            </dl>
            <dl className='productInfoList'>
              <dt className='productInfoListTitle'>중량/용량</dt>
              <dd className='productInfoListDesc'>
                {this.props.weightOrCapacity}
              </dd>
            </dl>
            <dl className='productInfoList'>
              <dt className='productInfoListTitle'>배송구분</dt>
              <dd className='productInfoListDesc'>
                {this.props.deliveryCategory}
              </dd>
            </dl>
            <dl className='productInfoList'>
              <dt className='productInfoListTitle'>원산지</dt>
              <dd className='productInfoListDesc'>
                {this.props.originCountry}
              </dd>
            </dl>
            <dl className='productInfoList'>
              <dt className='productInfoListTitle'>포장타입</dt>
              <dd className='productInfoListDesc'>
                {this.props.packageType}
                <strong className='productInfoListDescStr'>
                  {this.props.packageMessage}
                </strong>
              </dd>
            </dl>
            <dl className='productInfoList'>
              <dt className='productInfoListTitle'>안내사항</dt>
              <dd className='productInfoListDesc'>{this.props.notification}</dd>
            </dl>
          </div>
          <div className='cartAdd'>
            <div className='cartAddOption'>
              <span className='cartAddQuantaty'>구매수량</span>
              <div className='cartAddQuantatyOption'>
                <span className='cartAddQuantatySet'>
                  <button
                    className='btns minusBtn'
                    type='button'
                    onClick={this.props.qauntatyMinus}
                  />
                  <button className='btns btnResult'>
                    {this.props.quantaty}
                  </button>
                  <button
                    className='btns plusBtn'
                    type='button'
                    onClick={this.props.qauntatyPlus}
                  />
                </span>
              </div>
            </div>
            <div className='totalResult'>
              <div className='priceResult'>
                <strong className='totalPriceTitle'>총 상품금액 : </strong>
                <span className='totalPriceIs'>
                  <span className='totalPrice'>{this.props.totalPrice}</span>
                  <span className='totalPriceWon'> 원</span>
                </span>
              </div>
              <div className='pointResult'>
                <span className='earnPointIcon'>적립</span>
                <span className='earnPointDesc'>
                  구매 시{' '}
                  <strong className='earnPointDesc'>
                    {this.props.totalEarnPoint}원 적립
                  </strong>
                </span>
              </div>
            </div>
            <div className='cartAddBtns'>
              <button className='restockAlarmBtn' type='button'>
                재입고 알림
              </button>
              <button className='cartAddBtn' type='button'>
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
