import { Component } from 'react';
import './PolicyCheckbox.scss';

export default class PolicyCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  all = {
    name: 'isAgreeAllChecked',
    text: '전체 동의합니다.',
  };

  usage = {
    name: 'isUsagePolicyChecked',
    text: '이용약관 동의',
    required: 1,
    btnState: 'isUsagePolicyOpened',
  };

  piRequired = {
    name: 'isPIRequiredPolicyChecked',
    text: '개인정보 수집·이용 동의',
    required: 1,
    btnState: 'isPIRequiredPolicyOpened',
  };

  piOptional = {
    name: 'isPIOptionalPolicyChecked',
    text: '개인정보 수집·이용 동의',
    required: 2,
    btnState: 'isPIOptionalPolicyOpened',
  };

  marketing = {
    name: 'isMarketingChecked',
    text: '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
    required: 2,
  };

  sms = {
    name: 'isSmsChecked',
    text: 'SMS',
  };

  email = {
    name: 'isEmailChecked',
    text: '이메일',
  };

  fourteen = {
    name: 'isOlderThanFourteenChecked',
    text: '본인은 만 14세 이상입니다.',
    required: 1,
  };

  render() {
    const { input, state, handler } = this.props;
    const { name, text, required, btnState } = this[input];
    return (
      <div className={`PolicyCheckbox ${name}`}>
        <label>
          <inputname
            type='checkbox'
            name={name ? name : null}
            onChange={handler.clickPolicyCheckbox}
          />
          <span className={state ? 'icoChecked' : 'icoUnchecked'}></span>
          {text}
        </label>
        {required === 1 && <span className='required'>(필수)</span>}
        {required === 2 && <span className='optional'>(선택)</span>}
        {btnState && (
          <button
            type='button'
            className='btnPolicy'
            onClick={() => handler.openPolicyPopup(btnState)}
          >
            약관보기 &gt;
          </button>
        )}
      </div>
    );
  }
}
