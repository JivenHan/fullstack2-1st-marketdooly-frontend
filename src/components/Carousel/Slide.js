import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Slide.scss';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isHoverOnImg: false,
    };
  }

  toggleBouncingImg = event => {
    const value = event.type === 'mouseenter';
    this.setState({
      isHoverOnImg: value,
    });
  };

  render() {
    const {
      product_image,
      name,
      sales_price,
      discount_rate,
      original_price,
      special_features,
    } = this.props.data;
    return (
      <li className='Slide'>
        <dl>
          <dt
            className={`productThumb ${
              this.state.isHoverOnImg ? 'bounce' : ''
            }`}
            onMouseEnter={this.toggleBouncingImg}
            onMouseLeave={this.toggleBouncingImg}
          >
            {special_features && (
              <span className='specialFeatureTag'>
                <strong>{special_features}</strong>
              </span>
            )}
            <Link to='/'>
              <img src={product_image} alt={name} />
            </Link>
          </dt>
          <dd className='productInfo'>
            <h4 className='name'>
              <Link to='/'>{name}</Link>
            </h4>
            <span className='price'>
              {discount_rate ? (
                <span className='discount'>{discount_rate + '%'}</span>
              ) : null}
              {new Intl.NumberFormat('ko-KR').format(sales_price) + '원'}
            </span>
            {discount_rate ? (
              <span className='cost'>
                {new Intl.NumberFormat('ko-KR').format(original_price) + '원'}
              </span>
            ) : null}
          </dd>
        </dl>
      </li>
    );
  }
}
