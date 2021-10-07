import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.scss';

export default class OfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
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
    const { header, imgUrl, description } = this.props.data;
    return (
      <li className='card'>
        <dl>
          <dt
            className={this.state.isHoverOnImg ? 'bounce' : ''}
            onMouseEnter={this.toggleBouncingImg}
            onMouseLeave={this.toggleBouncingImg}
          >
            <Link to='/'>
              <img src={imgUrl} alt={header} />
            </Link>
          </dt>
          <dd>
            <h3 className='header'>
              <Link to='/'>{header}</Link>
            </h3>
            <p className='desc'>{description}</p>
          </dd>
        </dl>
      </li>
    );
  }
}
