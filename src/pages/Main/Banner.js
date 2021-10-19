import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Banner.scss';

export default class Banner extends Component {
  render() {
    const { url, imgUrl, bannerName } = this.props;
    return (
      <div className='barBanner'>
        <Link to={`${url}`}>
          <img src={imgUrl} alt={bannerName} />
        </Link>
      </div>
    );
  }
}
