import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SpecialPrice.scss';

export default class specialPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isHoverOnImg: false,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    fetch(`http://localhost:3000/${this.props.dataLink}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
        })
      );
  };

  toggleBouncingImg = event => {
    const value = event.type === 'mouseenter';
    this.setState({
      isHoverOnImg: value,
    });
  };

  renderComponents = data => {
    const { id, header, imgUrl, description } = data;
    return (
      <li className='card' key={id}>
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
  };

  render() {
    return (
      <section className={this.props.sectionName}>
        <div className='titGoods'>
          <h3 className='tit'>
            <span className='titTitle'>
              <Link to='/'>{this.props.title}</Link>
            </span>
          </h3>
        </div>
        <ul>{this.state.data.map(this.renderComponents)}</ul>
      </section>
    );
  }
}
