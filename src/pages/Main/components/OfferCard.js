import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.scss';

export default class OfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isHoverOnImg: false,
    };
  }

  toggleBouncingImg = event => {
    this.setState({
      isHoverOnImg: event.type === 'mouseenter',
    });
  };

  render() {
    const { id, name, product_image, description } = this.props.data;
    return (
      <li className='card'>
        <dl>
          <dt
            className={this.state.isHoverOnImg ? 'bounce' : ''}
            onMouseEnter={this.toggleBouncingImg}
            onMouseLeave={this.toggleBouncingImg}
          >
            <Link to={`/detail/${id}`}>
              <img src={product_image} alt={name} />
            </Link>
          </dt>
          <dd>
            <h3 className='header'>
              <Link to={`/detail/${id}`}>{name}</Link>
            </h3>
            <p className='desc'>{description}</p>
          </dd>
        </dl>
      </li>
    );
  }
}
