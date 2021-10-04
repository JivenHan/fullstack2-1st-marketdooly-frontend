import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Slide.scss';

export default class Slide extends Component {
  render() {
    return (
      <li className='Slide'>
        <dl>
          <dt className='productThumb'>
            <Link to='/'>
              <img src={this.props.imgUrl} alt={this.props.name} />
            </Link>
          </dt>
          <dd className='productInfo'>
            <h3 className='name'>
              <Link to='/'>{this.props.name}</Link>
            </h3>
            <span className='price'>
              {this.props.discount && (
                <span className='discount'>
                  {this.props.discountRate + '%'}
                </span>
              )}
              {this.props.price + '원'}
            </span>
            {this.props.discount && (
              <span className='cost'>{this.props.cost + '원'}</span>
            )}
          </dd>
        </dl>
      </li>
    );
  }
}
