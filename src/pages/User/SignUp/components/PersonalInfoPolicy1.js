import { Component } from 'react';
import './PersonalInfoPolicy1.scss';

export default class PersonalInfoPolicy1 extends Component {
  render() {
    return (
      <div className='UsagePolicy'>
        <div className='policyContainer'>
          <p className='mainTitle'>
            개인정보 수집·이용 동의 <span>&nbsp;(필수)</span>
          </p>
          <button type='button' onClick={this.props.clickConfirmBtn}>
            확인
          </button>
        </div>
      </div>
    );
  }
}
