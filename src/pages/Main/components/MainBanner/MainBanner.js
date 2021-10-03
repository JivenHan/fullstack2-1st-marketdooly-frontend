import React, { Component } from 'react';
import Slide from './Slide';
import { mainBannerData } from './MainBannerData';
import './MainBanner.scss';

export default class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      slideCount: 11,
      currentSlide: 0,
      viewportWidth: 1050,
      autoSlide: true,
      autoSlideTiming: 4,
    };
    this.timer = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewSize);
    if (this.state.autoSlide) this.autoSlide();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  autoSlide = () => {
    this.timer = setInterval(
      this.nextSlider,
      this.state.autoSlideTiming * 1000
    );
  };

  updateViewSize = () => {
    const viewportWidth = window.innerWidth > 1050 ? window.innerWidth : 1050;
    this.setState(
      {
        viewportWidth,
      },
      () => {
        console.log(this.state.viewportWidth);
      }
    );
  };

  displaySlides = datas => {
    return datas.map(ele => {
      const { id, imgUrl } = ele;
      return <Slide key={id} id={id} imgUrl={imgUrl}></Slide>;
    });
  };

  nextSlider = onClick => {
    onClick && clearInterval(this.timer);
    this.setState({
      currentSlide: this.state.currentSlide + 1,
    });
  };

  prevSlider = onClick => {
    onClick && clearInterval(this.timer);
    this.setState({
      currentSlide: this.state.currentSlide - 1,
    });
  };

  render() {
    return (
      <div className='mainBannerWrapper'>
        <div
          className='mainBanner'
          style={{
            width: `${this.state.slideCount * 100}%`,
            transform: `translateX(-${
              window.innerWidth * this.state.currentSlide
            }px)`,
            transition: `transform 0.5s ease-in-out`,
          }}
        >
          <ul>{this.displaySlides(mainBannerData)}</ul>
        </div>
        <div className='mainBannerCtrl'>
          <button onClick={this.prevSlider}>prev</button>
          <button onClick={this.nextSlider}>next</button>
        </div>
      </div>
    );
  }
}
