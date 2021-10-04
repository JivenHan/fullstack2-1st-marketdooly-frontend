import React, { Component } from 'react';
import './Main.scss';
import MainBanner from './components/MainBanner/MainBanner';
import Carousel from '../../components/Carousel/Carousel';

export default class Main extends Component {
  render() {
    return (
      <div>
        <MainBanner />
        <Carousel />
      </div>
    );
  }
}
