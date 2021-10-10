import React, { Component } from 'react';
import './AdditionalInfo.scss';

export default class AdditionalInfo extends Component {
  render() {
    return (
      <div className='additionalInfo'>
        <img
          className='additionalInfoImg'
          alt='additionalInfoImg'
          src={this.props.additionalInfo}
        />
      </div>
    );
  }
}
