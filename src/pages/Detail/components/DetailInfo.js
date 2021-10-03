import React, { Component } from 'react';
import './DetailInfo.scss';

export default class DetailInfo extends Component {
  render() {
    return (
      <div className='detailInfo'>
        <img
          className='infoImg'
          alt='상세정보 이미지'
          src='https://img-cf.kurly.com/shop/data/goodsview/20201228/gv10000146998_1.jpg'
        />
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>상품명</dt>
          <dd className='infoListData'>{this.props.productName}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>인증여부</dt>
          <dd className='infoListData'>{this.props.certification}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>포장단위</dt>
          <dd className='infoListData'>{this.props.packagingUnit}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>관련법상 표기사항</dt>
          <dd className='infoListData'>{this.props.matterNote}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>생산자/취급자</dt>
          <dd className='infoListData'>{this.props.producer}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>보관방법 및 취급방법</dt>
          <dd className='infoListData'>{this.props.howToStore}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>원산지</dt>
          <dd className='infoListData'>{this.props.originCountry}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>소비자상담실 전화번호</dt>
          <dd className='infoListData'>{this.props.serviceCall}</dd>
        </dl>
        <dl className='detailInfoList'>
          <dt className='infoListTitle'>제조일자(포장일)</dt>
          <dd className='infoListData'>{this.props.produceDate}</dd>
        </dl>
      </div>
    );
  }
}
