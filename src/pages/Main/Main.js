import React, { Component } from 'react';
import './Main.scss';
import MainBanner from './components/MainBanner/MainBanner';
import Carousel from '../../components/Carousel/Carousel';

export default class Main extends Component {
  render() {
    return (
      <main>
        <MainBanner />
        <section className='productList'>
          <div className='titGoods'>
            <h3 className='tit'>이 상품 어때요?</h3>
          </div>
          <Carousel />
        </section>
      </main>
    );
  }
}
