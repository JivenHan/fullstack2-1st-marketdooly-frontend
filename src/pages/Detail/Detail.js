import React, { Component } from 'react';
import DetailCartAdd from './components/DetailCartAdd';
import DetailScrollBtn from './components/DetailScrollBtn';
import DetailDesc from './components/DetailDesc';
import DetailInfo from './components/DetailInfo';
import './Detail.scss';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      productDetail: {},
      detailDesc: {},
      doolysTip: {},
      detailInfo: {},
      layerClass: 'layerHide',
      totalPrice: '',
      totalEarnPoint: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/productDatailData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          productDetail: data.vegetable[0].ecoFriendly[1],
          detailDesc: data.vegetable[0].ecoFriendly[1].detailDesc,
          doolysTip: data.vegetable[0].ecoFriendly[1].doolysTip,
          detailInfo: data.vegetable[0].ecoFriendly[1].productDetailInfo,
        });
      });
  }

  render() {
    const { productDetail } = this.state;
    const { detailDesc } = this.state;
    const { doolysTip } = this.state;
    const { detailInfo } = this.state;
    return (
      <article>
        <DetailCartAdd
          thumbImg={productDetail.imgUrl}
          nameKor={productDetail.nameKor}
          shortDesc={productDetail.shortDesc}
          dcInfo='회원할인가'
          dcPrice={productDetail.discountedPrice}
          dcPercent={productDetail.discountRate}
          originalPrice={productDetail.originalPrice}
          dcInfoLayerClass={this.state.layerClass}
          earnPoint={productDetail.earnPoint}
          saleUnit={productDetail.saleUnit}
          weightOrCapacity={productDetail.weightOrCapacity}
          deliveryCategory={productDetail.deliveryCategory}
          originCountry={productDetail.originCountry}
          packageType={productDetail.packageType}
          packageMessage={productDetail.packageMessage}
          notification={productDetail.notification}
          totalPrice={this.state.totalPrice}
          totalEarnPoint={this.state.totalEarnPoint}
        />
        <DetailScrollBtn />
        <DetailDesc
          detailDescTitle={detailDesc.detailDescTitle}
          detailDescName={detailDesc.detailDescName}
          detailDescArticle={detailDesc.detailDescArticle}
          tipOneTitle={doolysTip.tipOneTitle}
          tipOneDesc={doolysTip.tipOneDesc}
          tipOneImg={doolysTip.tipOneImg}
          tipTwoTitle={doolysTip.tipTwoTitle}
          tipTwoDesc={doolysTip.tipTwoDesc}
          tipTwoImg={doolysTip.tipTwoImg}
          tipThreeTitle={doolysTip.tipThreeTitle}
          tipThreeDesc={doolysTip.tipThreeDesc}
          tipFourTitle={doolysTip.tipFourTitle}
          tipFourDesc={doolysTip.tipFourDesc}
          tipFiveTitle={doolysTip.tipFiveTitle}
          tipFiveDesc={doolysTip.tipFiveDesc}
        />
        <DetailInfo
          productName={detailInfo.productName}
          certification={detailInfo.certification}
          packagingUnit={detailInfo.packagingUnit}
          matterNote={detailInfo.matterNote}
          producer={detailInfo.producer}
          howToStore={detailInfo.howToStore}
          originCountry={detailInfo.originCountry}
          serviceCall={detailInfo.serviceCall}
          produceDate={detailInfo.produceDate}
        />
      </article>
    );
  }
}
