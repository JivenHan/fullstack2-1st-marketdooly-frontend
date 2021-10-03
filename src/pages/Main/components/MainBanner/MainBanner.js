import React, { Component } from 'react';
import Slide from './Slide';
import { mainBannerData } from './MainBannerData';
import './MainBanner.scss';

export default class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      autoSlide: true,
      autoSlideTiming: 4,
      currentSlide: 0,
      isPaused: false,
      slideCount: mainBannerData.length,
      sliderWidth: 1050,
      visibleCtrl: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewSize);
    this.state.autoSlide && this.autoSlide();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewSize);
    clearInterval(this.autoSlide);
  }

  autoSlide = () => {
    this.timer = setInterval(() => {
      !this.state.isPaused && this.nextSlider();
    }, this.state.autoSlideTiming * 1000);
  };

  updateViewSize = () => {
    const sliderWidth = window.innerWidth > 1050 ? window.innerWidth : 1050;
    this.setState({
      sliderWidth,
    });
  };

  toggleCtrlVisibility = event => {
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
    if (currentSlide < slideCount - 1) {
      this.moveSlider('next');
    }
    if (currentSlide >= slideCount - 1) {
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
    }
    if (currentSlide <= 0) {
      this.setState(
        {
          currentSlide: slideCount,
        },
        () => this.moveSlider('prev')
      );
    }
  };

  renderSlides = datas => {
    return datas.map(ele => {
      const { id, imgUrl } = ele;
      return <Slide key={id} id={id} imgUrl={imgUrl}></Slide>;
    });
  };

  render() {
    return (
      <div
        className='mainBannerWrapper'
        onMouseEnter={this.toggleCtrlVisibility}
        onMouseLeave={this.toggleCtrlVisibility}
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
            {this.renderSlides(mainBannerData)}
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
