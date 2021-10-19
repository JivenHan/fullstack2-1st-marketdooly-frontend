import React, { Component } from 'react';
import Slide from './Slide';
import './MainBanner.scss';

export default class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      autoSlide: true,
      autoSlideTiming: 3.5,
      currentSlide: 1,
      isPaused: false,
      slideCount: 0,
      sliderWidth: 1050,
      visibleCtrl: false,
    };
    this.slidingAnimation = true;
    this.transitionTiming = 500;
  }

  componentDidMount() {
    this.requestData();
    window.addEventListener('resize', this.updateViewSize);
    this.timer = setInterval(() => {
      !this.state.isPaused && this.nextSlider();
    }, this.state.autoSlideTiming * 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewSize);
    clearInterval(this.timer);
  }

  requestData = () => {
    fetch('/data/infiniteCarousel.JSON') // 테스트 중 원본은 => http://localhost:8000/main/banner/main
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
          slideCount: data.length + 2,
        })
      );
  };

  updateViewSize = () => {
    this.setState({
      sliderWidth:
        document.body.clientWidth > 1050 ? document.body.clientWidth : 1050,
    });
  };

  toggleCtrlVisibility = event => {
    this.setState({
      visibleCtrl: event.type === 'mouseenter',
      isPaused: event.type === 'mouseenter',
    });
  };

  moveSlider = direction => {
    this.setState({
      currentSlide: this.state.currentSlide + (direction === 'next' ? 1 : -1),
    });
  };

  infiniteLoop = nextSlide => {
    setTimeout(async () => {
      this.slidingAnimation = false;
      await this.setState({
        currentSlide: nextSlide,
      });
      this.slidingAnimation = true;
    }, this.transitionTiming);
  };

  nextSlider = () => {
    const { currentSlide, slideCount } = this.state;
    if (currentSlide < slideCount - 1) {
      this.moveSlider('next');
    }
    if (currentSlide === slideCount - 2) {
      this.infiniteLoop(1);
    }
  };

  prevSlider = () => {
    const { currentSlide } = this.state;
    if (currentSlide > 1) {
      this.moveSlider('prev');
    }
    if (currentSlide <= 1) {
      this.moveSlider();
      this.infiniteLoop(5);
    }
  };

  renderSlides = datas => {
    return datas.map(ele => {
      const { id, image, link } = ele;
      return <Slide key={id} id={id} image={image} link={link}></Slide>;
    });
  };

  render() {
    const { data, slideCount, currentSlide, visibleCtrl } = this.state;
    return (
      <div
        className='mainBannerWrapper'
        onMouseEnter={this.toggleCtrlVisibility}
        onMouseLeave={this.toggleCtrlVisibility}
      >
        <div className='mainBanner'>
          <ul
            style={{
              width: `${slideCount * 100}%`,
              transform: `translateX(-${
                document.body.clientWidth * currentSlide
              }px)`,
              transition: this.slidingAnimation
                ? `transform ${this.transitionTiming}ms ease-in-out`
                : 'none',
            }}
          >
            <Slide id={data.length} image={data[data.length - 1]?.image}>
              LAST SLIDER
            </Slide>
            {this.renderSlides(data)}
            <Slide id={1} image={data[0]?.image}>
              LAST SLIDER
            </Slide>
          </ul>
        </div>
        <div
          className='mainBannerCtrl'
          style={{ opacity: `${visibleCtrl ? 1 : 0}` }}
        >
          <button onClick={this.prevSlider}>prev</button>
          <button onClick={this.nextSlider}>next</button>
        </div>
      </div>
    );
  }
}
