import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Banner.scss';

export default class Banner extends Component {
  render() {
    return (
      <div className='barBanner'>
        <Link to='/'>
          <img src={this.props.imgUrl} alt={this.props.bannerName} />
        </Link>
      </div>
    );
  }
}
