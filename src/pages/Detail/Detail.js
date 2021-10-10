import React, { Component } from 'react';
import CartAdd from './components/CartAdd';
import ScrollBtn from './components/ScrollBtn';
import Desc from './components/Desc';
import AdditionalInfo from './components/AdditionalInfo';
import DetaiInfo from './components/DetaiInfo';
import CustomerCenter from './components/CustomerCenter';
import BottomLayer from './components/BottomLayer';
import './Detail.scss';

export default class Detail extends Component {
  constructor() {
    super();
    this.observerRef = React.createRef();
    this.descRef = React.createRef();
    this.infoRef = React.createRef();
    this.reviewRef = React.createRef();
    this.inquiryRef = React.createRef();
    this.state = {
      productDetail: {},
      detailDesc: {},
      checkPoint: {},
      detailInfo: {},
      layerClass: 'layerHide',
      totalPrice: '',
      totalEarnPoint: '',
      quantity: 1,
      isBottomLayerUp: false,
      scrollBtns: [
        { btnId: 1, btnName: '상품설명', isClicked: false },
        { btnId: 2, btnName: '상세정보', isClicked: false },
        { btnId: 3, btnName: '후기', isClicked: false },
        { btnId: 4, btnName: '문의', isClicked: false },
      ],
    };
  }

  qauntityMinus = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState({ quantity: quantity - 1 });
    }
  };

  qauntityPlus = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  };

  handleBtnClick = idx => {
    const { scrollBtns } = this.state;
    const newScrollBtns = scrollBtns.map(el => {
      if (idx === el.btnId) {
        el.isClicked = true;
        return el;
      } else {
        el.isClicked = false;
        return el;
      }
    });
    this.setState({ scrollBtns: newScrollBtns });

    scrollBtns.forEach(el => {
      if (el.isClicked === true) {
        if (el.btnId === 1) {
          window.scrollTo({
            top: this.descRef.current.offsetTop,
            behavior: 'smooth',
          });
        } else if (el.btnId === 2) {
          window.scrollTo({
            top: this.infoRef.current.offsetTop,
            behavior: 'smooth',
          });
        } else if (el.btnId === 3) {
          window.scrollTo({
            top: this.reviewRef.current.offsetTop,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo({
            top: this.inquiryRef.current.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  };

  componentDidMount() {
    fetch('/data/detail/vegetable/ecoFriendly/springonion.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          productDetail: data,
          detailDesc: data.detailDesc,
          checkPoint: data.checkPoint,
          detailInfo: data.detailInfo,
        });
      });

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting) {
        this.setState({ isBottomLayerUp: true });
      } else {
        this.setState({ isBottomLayerUp: false });
      }
    });
    observer.observe(this.observerRef.current);
  }

  render() {
    const {
      productDetail,
      detailDesc,
      detailInfo,
      quantity,
      isBottomLayerUp,
      scrollBtns,
    } = this.state;
    const totalPrice = quantity * productDetail.salesPrice;
    const totalEarnPoint = quantity * productDetail.earnPoint;

    const scrollBtnsList = scrollBtns.map(ele => (

      <ScrollBtn
        btnId={ele.btnId}
        btnName={ele.btnName}
        isClicked={ele.isClicked}
        handleBtnClick={this.handleBtnClick}
      />
    ));

    return (
      <article>
        <div className='detailMainContainer'>
          <img
            className='productThumbImg'
            alt='productThumbImg'
            src={productDetail.thumbImgUrl}
          />
          <CartAdd
            observerRef={this.observerRef}
            {...productDetail}
            dcInfoLayerClass={this.state.layerClass}
            qauntityMinus={this.qauntityMinus}
            quantity={quantity}
            qauntityPlus={this.qauntityPlus}
            totalPrice={totalPrice}
            totalEarnPoint={totalEarnPoint}
          />
          <div className='scrollBtns'>{scrollBtnsList}</div>
          <Desc descRef={this.descRef} {...productDetail} {...detailDesc} />
          <AdditionalInfo additionalInfo={productDetail.additionalInfo} />
          <DetaiInfo infoRef={this.infoRef} {...detailInfo} />
          <CustomerCenter />

          <div className='reviewLocation' ref={this.reviewRef}>
            <span>후기 들어갈 자리</span>
          </div>
          <div className='inquiryLocation' ref={this.inquiryRef}>
            <span>문의 들어갈 자리</span>
          </div>
        </div>
        {isBottomLayerUp && (
          <BottomLayer
            {...productDetail}
            isBottomLayerUp={isBottomLayerUp}
            qauntityMinus={this.qauntityMinus}
            quantity={quantity}
            qauntityPlus={this.qauntityPlus}
            totalPrice={totalPrice}
            totalEarnPoint={totalEarnPoint}
          />
        )}
      </article>
    );
  }
}
