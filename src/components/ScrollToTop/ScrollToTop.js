import React, { Component } from 'react';
import './ScrollToTop.scss';

export default class ScrollToTop extends Component {
  constructor() {
    super();
    this.state = {
      scrollingBtnVisible: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.detectTargetScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.detectTargetScroll);
  }

  detectTargetScroll = () => {
    this.setState({
      scrollingBtnVisible: window.scrollY >= 1000,
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <div
        className={`ScrollToTop ${
          this.state.scrollingBtnVisible ? '' : 'hidden'
        }`}
      >
        <button className='ScrollToTopBtn' onClick={this.scrollToTop}>
          맨 위로가기
        </button>
      </div>
    );
  }
}
