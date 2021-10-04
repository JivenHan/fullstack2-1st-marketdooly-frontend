import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Slide.scss';

export default class Slide extends Component {
  render() {
    return (
      <li className={`slide slide${this.props.id}`}>
        <Link
          to='/'
          style={{ backgroundImage: `url(${this.props.imgUrl})` }}
        ></Link>
      </li>
    );
  }
}
