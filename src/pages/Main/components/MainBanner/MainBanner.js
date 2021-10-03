import React, { Component } from 'react';
import Slide from './Slide';
import { mainBannerData } from './MainBannerData';
import './MainBanner.scss';

export default class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      slideCount: mainBannerData.length,
      currentSlide: 0,
      viewportWidth: 1050,
      autoSlide: true,
      isPaused: false,
      autoSlideTiming: 4,
      visibleCtrl: false,
    };
    this.timer = null;
    this.resize = null;
  }

  componentDidMount() {
    this.resize = window.addEventListener('resize', this.updateViewSize);
    if (this.state.autoSlide) this.autoSlide();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener(this.resize);
  }

  autoSlide = () => {
    this.timer = setInterval(() => {
      !this.state.isPaused && this.nextSlider();
    }, this.state.autoSlideTiming * 1000);
  };

  updateViewSize = () => {
    const viewportWidth = window.innerWidth > 1050 ? window.innerWidth : 1050;
    this.setState({
      viewportWidth,
    });
  };

  displaySlides = datas => {
    return datas.map(ele => {
      const { id, imgUrl } = ele;
      return <Slide key={id} id={id} imgUrl={imgUrl}></Slide>;
    });
  };

  makeVisibleCtrl = event => {
    const value = event.type === 'mouseenter';
    this.setState({
      visibleCtrl: value,
      isPaused: value,
    });
  };

  moveSlider = direction => {
    if (direction === 'next') {
      this.setState({
        currentSlide: this.state.currentSlide + 1,
      });
    } else if (direction === 'prev') {
      this.setState({
        currentSlide: this.state.currentSlide - 1,
      });
    }
  };

  nextSlider = () => {
    const { currentSlide, slideCount } = this.state;
    this.moveSlider('next');
    if (currentSlide < slideCount - 1) {
    } else if (currentSlide === slideCount - 1) {
      this.setState(
        {
          currentSlide: 0,
        },
        () => this.nextSlider
      );
    }
  };

  prevSlider = () => {
    const { currentSlide, slideCount } = this.state;
    if (currentSlide > 0) {
      this.moveSlider('prev');
    } else if (currentSlide <= 0) {
      this.setState(
        {
          currentSlide: slideCount,
        },
        () => this.moveSlider('prev')
      );
    }
  };

  render() {
    return (
      <div
        className='mainBannerWrapper'
        onMouseEnter={this.makeVisibleCtrl}
        onMouseLeave={this.makeVisibleCtrl}
      >
        <div className='mainBanner'>
          <ul
            style={{
              width: `${this.state.slideCount * 100}%`,
              transform: `translateX(-${
                window.innerWidth * this.state.currentSlide
              }px)`,
              transition: `transform 0.5s ease-in-out`,
            }}
          >
            {this.displaySlides(mainBannerData)}
          </ul>
        </div>
        <div
          className='mainBannerCtrl'
          style={{ opacity: `${this.state.visibleCtrl ? 1 : 0}` }}
        >
          <button onClick={this.prevSlider}>prev</button>
          <button onClick={this.nextSlider}>next</button>
        </div>
      </div>
    );
  }
}
