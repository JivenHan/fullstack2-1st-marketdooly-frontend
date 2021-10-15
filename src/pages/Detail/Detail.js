import React, { Component } from 'react';
import CartAdd from './components/CartAdd';
import ScrollBtn from './components/ScrollBtn';
import Desc from './components/Desc';
import Label from './components/Label';
import CustomerCenter from './components/CustomerCenter';
import BottomLayer from './components/BottomLayer';
import './Detail.scss';

export default class Detail extends Component {
  constructor() {
    super();
    this.observerRef = React.createRef();
    this.descRef = React.createRef();
    this.labelRef = React.createRef();
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
            top: this.labelRef.current.offsetTop,
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
    fetch(`http://localhost:8000/products/${this.props.match.params.id}`)
      .then(res => {
        if (!res.ok) {
          const msg = res.json();
          throw new Error(msg);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          productDetail: data[0],
        });
      })
      .catch(err => {
        console.log(err);
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

  addToCart = () => {
    fetch('http://localhost:8000/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1,
        product_id: this.state.productDetail.id,
        quantity: this.state.quantity,
      }),
    }).then(res => res.json());
  };

  render() {
    const { productDetail, quantity, isBottomLayerUp, scrollBtns } = this.state;
    const totalPrice = quantity * productDetail.sales_price;
    const totalEarnPoint = quantity * productDetail.earn_points;

    const scrollBtnsList = scrollBtns.map((ele, idx) => (
      <ScrollBtn
        key={idx}
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
            src={productDetail.product_image}
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
            addToCart={this.addToCart}
          />

          <div className='scrollBtns'>{scrollBtnsList}</div>

          <Desc
            descRef={this.descRef}
            descImg={productDetail.description_image}
          />

          <Label
            labelRef={this.labelRef}
            labelImg={productDetail.labeling_image}
          />

          <CustomerCenter template={productDetail.template_image} />

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
            addToCart={this.addToCart}
          />
        )}
      </article>
    );
  }
}
