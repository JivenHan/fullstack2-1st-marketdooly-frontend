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
      linkTo,
      imgUrl,
      name,
      price,
      discount,
      discountRate,
      cost,
      specialFeature,
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
            {specialFeature && (
              <span className='specialFeatureTag'>
                <strong>{specialFeature}</strong>
              </span>
            )}
            <Link to={linkTo}>
              <img src={imgUrl} alt={name} />
            </Link>
          </dt>
          <dd className='productInfo'>
            <h4 className='name'>
              <Link to={linkTo}>{name}</Link>
            </h4>
            <span className='price'>
              {discount && (
                <span className='discount'>{discountRate + '%'}</span>
              )}
              {price + '원'}
            </span>
            {discount && <span className='cost'>{cost + '원'}</span>}
          </dd>
        </dl>
      </li>
    );
  }
}
