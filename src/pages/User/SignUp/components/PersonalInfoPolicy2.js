import { Component } from 'react';
import './PersonalInfoPolicy2.scss';

export default class PersonalInfoPolicy2 extends Component {
  render() {
    return (
      <div className='PersonalInfoPolicy2'>
        <div className='policyContainer'>
          <p className='mainTitle'>
            개인정보 수집·이용 동의 <span>&nbsp;(선택)</span>
          </p>
          <button type='button' onClick={this.props.clickConfirmBtn}>
            확인
          </button>
        </div>
      </div>
    );
  }
}
