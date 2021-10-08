import React, { Component } from 'react';
import Slide from './Slide';
import './Carousel.scss';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      maxPage: 0,
      lastSlidingCorrection: 0,
      totalSlide: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) this.updateSlider();
  }

  updateSlider = () => {
    const { data } = this.props;
    this.setState({
      currentPage: 1,
      maxPage: Math.ceil(data.length / 4),
      lastSlidingCorrection: (4 - (data.length % 4)) * 267,
      totalSlide: data.length,
    });
  };

  calcSlidingRange = () => {
    const { currentPage, maxPage, lastSlidingCorrection } = this.state;
    if (currentPage === maxPage) {
      return 1068 * (currentPage - 1) - lastSlidingCorrection;
    } else {
      return 1068 * (currentPage - 1);
    }
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
    const { currentPage, maxPage } = this.state;
    return (
      <article className='Carousel'>
        <div className='sliderWrap'>
          <ul
            style={{
              transform: `translateX(-${this.calcSlidingRange()}px)`,
            }}
          >
            {this.props.data.map(ele => {
              return <Slide key={ele.id} data={ele} />;
            })}
          </ul>
        </div>
        <div className='sliderCtrl'>
          {currentPage !== 1 && (
            <button className='prev' onClick={this.prevSlide}></button>
          )}
          {currentPage < maxPage && (
            <button className='next' onClick={this.nextSlide}></button>
          )}
        </div>
      </article>
    );
  }
}
