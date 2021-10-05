import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Slide.scss';

export default class Slide extends Component {
  constructor() {
    super();
    this.state = {
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
            <Link to={this.props.linkTo}>
              <img src={this.props.imgUrl} alt={this.props.name} />
            </Link>
          </dt>
          <dd className='productInfo'>
            <h4 className='name'>
              <Link to={this.props.linkTo}>{this.props.name}</Link>
            </h4>
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
