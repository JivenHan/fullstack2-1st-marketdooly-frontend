import React, { Component } from 'react';
import { productsData } from './carouselData';
import './Carousel.scss';
import Slide from './Slide';

export default class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      productsData,
      currentSlide: 0,
      maxSlide: Math.floor(productsData.length / 4),
    };
  }

  render() {
    return (
      <article className='Carousel'>
        <div className='sliderWrap'>
          <ul
            style={{
              width: `${productsData.length * 1050}px`,
              transform: `translateX(-${1068 * this.state.currentSlide}px)`,
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
          {this.state.currentSlide !== 0 && (
            <button
              className='prev'
              onClick={() => {
                this.setState({
                  currentSlide: this.state.currentSlide - 1,
                });
              }}
            ></button>
          )}
          {this.state.currentSlide < this.state.maxSlide && (
            <button
              className='next'
              onClick={() => {
                this.setState({
                  currentSlide: this.state.currentSlide + 1,
                });
              }}
            ></button>
          )}
        </div>
      </article>
    );
  }
}
