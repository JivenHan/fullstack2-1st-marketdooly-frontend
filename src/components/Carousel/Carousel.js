import React, { Component } from 'react';
import { productsData } from './carouselData';
import './Carousel.scss';
import Slide from './Slide';

export default class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      productsData,
    };
  }

  render() {
    return (
      <article className='Carousel'>
        <ul className='sliderWrap'>
          {this.state.productsData.map(ele => {
            const { id, imgUrl, name, price, discount, discountRate, cost } =
              ele;
            return (
              <Slide
                key={id}
                imgUrl={imgUrl}
                name={name}
                price={price}
                discount={discount}
                discountRate={discountRate}
                cost={cost}
              />
            );
          })}
        </ul>
        <div className='sliderCtrl'>
          <button></button>
          <button></button>
        </div>
      </article>
    );
  }
}
