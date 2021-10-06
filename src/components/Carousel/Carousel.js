import React, { Component } from 'react';
import './Carousel.scss';
import Slide from './Slide';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: props.productsData,
      currentPage: 1,
      maxPage: Math.ceil(props.productsData.length / 4),
      lastSlidingCorrection: (4 - (props.productsData.length % 4)) * 267,
      totalSlide: props.productsData.length,
    };
  }

  calcSlidingRange = () => {
    const { currentPage, maxPage, lastSlidingCorrection } = this.state;
    if (currentPage === maxPage)
      return 1068 * (currentPage - 1) - lastSlidingCorrection;
    return 1068 * (currentPage - 1);
  };

  prevSlide = () => {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  };

  nextSlide = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };

  render() {
    return (
      <article className='Carousel'>
        <div className='sliderWrap'>
          <ul
            style={{
              transform: `translateX(-${this.calcSlidingRange()}px)`,
            }}
          >
            {this.state.productsData.map(ele => {
              const {
                id,
                linkTo,
                imgUrl,
                name,
                price,
                discount,
                discountRate,
                cost,
              } = ele;
              return (
                <Slide
                  key={id}
                  imgUrl={imgUrl}
                  linkTo={linkTo}
                  name={name}
                  price={price}
                  discount={discount}
                  discountRate={discountRate}
                  cost={cost}
                />
              );
            })}
          </ul>
        </div>
        <div className='sliderCtrl'>
          {this.state.currentPage !== 1 && (
            <button className='prev' onClick={this.prevSlide}></button>
          )}
          {this.state.currentPage < this.state.maxPage && (
            <button className='next' onClick={this.nextSlide}></button>
          )}
        </div>
      </article>
    );
  }
}
