import React, { Component } from 'react';
import './Main.scss';
import MainBanner from './components/MainBanner/MainBanner';

export default class Main extends Component {
  render() {
    return (
      <div>
        <MainBanner />
      </div>
    );
  }
}
