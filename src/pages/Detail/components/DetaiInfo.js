import React, { Component } from 'react';
import './DetaiInfo.scss';

export default class DetaiInfo extends Component {
  render() {
    const {
      productName,
      certification,
      packagingUnit,
      matterNote,
      producer,
      howToStore,
      originCountry,
      serviceCall,
      produceDate,
    } = this.props;

    const infoListTitleAndData = [
      { title: '상품명', data: productName },
      { title: '인증여부', data: certification },
      { title: '포장단위', data: packagingUnit },
      { title: '관련법상 표기사항', data: matterNote },
      { title: '생산자/취급자', data: producer },
      { title: '보관방법 및 취급방법', data: howToStore },
      { title: '원산지', data: originCountry },
      { title: '소비자상담실 전화번호', data: serviceCall },
      { title: '제조일자(포장일)', data: produceDate },
    ];
    const infoListMap = infoListTitleAndData.map(el => (
      <dl className='detailInfoList'>
        <dt className='infoListTitle'>{el.title}</dt>
        <dd className='infoListData'>{el.data}</dd>
      </dl>
    ));
    return (
      <div className='detailInfo' ref={this.props.infoRef}>
        <img
          className='infoImg'
          alt='상세정보 이미지'
          src={this.props.detailInfoImg}
        />
        {infoListMap}
      </div>
    );
  }
}
