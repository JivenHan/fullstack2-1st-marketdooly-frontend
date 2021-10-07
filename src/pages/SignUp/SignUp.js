import React, { Component } from 'react';
import UsagePolicy from './components/UsagePolicy';
import PersonalInfoPolicy1 from './components/PersonalInfoPolicy1';
import PersonalInfoPolicy2 from './components/PersonalInfoPolicy2';
import './SignUp.scss';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      isAgreeAllChecked: false,
      isUsagePolicyChecked: false,
      isPIPolicy1Checked: false,
      isPIPolicy2Checked: false,
      isMarketingChecked: false,
      isSmsChecked: false,
      isEmailChecked: false,
      isOlderThanFourteenChecked: false,
      isUsagePolicyOpened: false,
      isPIPolicy1Opened: false,
      isPIPolicy2Opened: false,
    };
  }

  checkIdDup = () => {
    alert('아이디 중복 체크 API 호출');
  };

  checkEmailDup = () => {
    alert('이메일 중복 체크 API 호출');
  };

  signUp = () => {
    alert('회원가입 API 호출');
  };

  changeGenderRadio = e => {
    this.setState({ gender: e.target.value });
  };

  clickPolicyCheckbox = e => {
    const { name, checked } = e.target;
    const { isSmsChecked, isEmailChecked } = this.state;

    this.setState({
      [name]: checked,
    });

    if (name === 'isMarketingChecked') {
      if (checked) {
        this.setState({
          isSmsChecked: true,
          isEmailChecked: true,
        });
      } else {
        this.setState({
          isSmsChecked: false,
          isEmailChecked: false,
        });
      }
    }

    if (name === 'isSmsChecked' || name === 'isEmailChecked') {
      if (
        (name === 'isSmsChecked' && checked && isEmailChecked) ||
        (name === 'isEmailChecked' && checked && isSmsChecked)
      ) {
        this.setState({ isMarketingChecked: true });
      } else {
        this.setState({ isMarketingChecked: false });
      }
    }

    if (name === 'isAgreeAllChecked') {
      if (checked) {
        this.setState({
          isAgreeAllChecked: true,
          isUsagePolicyChecked: true,
          isPIPolicy1Checked: true,
          isPIPolicy2Checked: true,
          isMarketingChecked: true,
          isSmsChecked: true,
          isEmailChecked: true,
          isOlderThanFourteenChecked: true,
        });
      } else {
        this.setState({
          isAgreeAllChecked: false,
          isUsagePolicyChecked: false,
          isPIPolicy1Checked: false,
          isPIPolicy2Checked: false,
          isMarketingChecked: false,
          isSmsChecked: false,
          isEmailChecked: false,
          isOlderThanFourteenChecked: false,
        });
      }
    }
  };

  clickConfirmBtn = () => {
    this.setState({
      isUsagePolicyOpened: false,
      isPIPolicy1Opened: false,
      isPIPolicy2Opened: false,
    });
  };

  render() {
    const {
      checkIdDup,
      checkEmailDup,
      changeGenderRadio,
      clickConfirmBtn,
      clickPolicyCheckbox,
      signUp,
    } = this;

    const {
      gender,
      isAgreeAllChecked,
      isUsagePolicyChecked,
      isPIPolicy1Checked,
      isPIPolicy2Checked,
      isMarketingChecked,
      isSmsChecked,
      isEmailChecked,
      isOlderThanFourteenChecked,
      isUsagePolicyOpened,
      isPIPolicy1Opened,
      isPIPolicy2Opened,
    } = this.state;

    const isPolicyOpened =
      isUsagePolicyOpened || isPIPolicy1Opened || isPIPolicy2Opened;

    return (
      <div className='SignUp'>
        <div className='signUpContainer'>
          <h2>회원가입</h2>
          <p className='asterisk'>
            <span className='asterisk'>*</span>필수입력사항
          </p>
          <table>
            <tbody>
              <tr>
                <th>
                  아이디<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='6자 이상의 영문 혹은 영문과 숫자를 조합' />
                  <button className='btnIdDup' onClick={checkIdDup}>
                    중복확인
                  </button>
                </td>
              </tr>
              <tr>
                <th>
                  비밀번호<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='비밀번호를 입력해주세요' />
                </td>
              </tr>
              <tr>
                <th>
                  비밀번호 확인<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='비밀번호를 한번 더 입력해주세요' />
                </td>
              </tr>
              <tr>
                <th>
                  이름<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='이름을 입력해주세요' />
                </td>
              </tr>
              <tr>
                <th>
                  이메일<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='예: marketdooly@wecode.com' />
                  <button className='btnEmailDup' onClick={checkEmailDup}>
                    중복확인
                  </button>
                </td>
              </tr>
              <tr>
                <th>
                  휴대폰<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='숫자만 입력해주세요' />
                </td>
              </tr>
              <tr>
                <th>
                  주소<span className='asterisk'>*</span>
                </th>
                <td>
                  <input placeholder='주소를 입력해주세요' />
                </td>
              </tr>
              <tr>
                <th>성별</th>
                <td className='gender'>
                  <label>
                    <input
                      type='radio'
                      value='male'
                      checked={gender === 'male'}
                      onChange={changeGenderRadio}
                    />
                    남자
                  </label>
                  <label>
                    <input
                      type='radio'
                      value='female'
                      checked={gender === 'female'}
                      onChange={changeGenderRadio}
                    />
                    여자
                  </label>
                  <label>
                    <input
                      type='radio'
                      value=''
                      checked={gender === ''}
                      onChange={changeGenderRadio}
                    />
                    선택 안함
                  </label>
                </td>
              </tr>
              <tr className='birthday'>
                <th>생년월일</th>
                <td>
                  <div className='yyyymmdd'>
                    <input maxLength='4' placeholder='YYYY' />
                    <span>/</span>
                    <input maxLength='2' placeholder='MM' />
                    <span>/</span>
                    <input maxLength='2' placeholder='DD' />
                  </div>
                </td>
              </tr>
              <tr className='policies'>
                <th>
                  이용약관동의<span className='asterisk'>*</span>
                </th>
                <td>
                  <div>
                    <label className='agreeAll'>
                      <input
                        type='checkbox'
                        name='isAgreeAllChecked'
                        checked={isAgreeAllChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isAgreeAllChecked ? 'icoChecked' : 'icoUnchecked'
                        }
                      ></span>
                      전체 동의합니다.
                    </label>
                    <p className='noti1'>
                      선택항목에 동의하지 않은 경우도 회원가입 및 일반적인
                      서비스를 이용할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <label>
                      <input
                        type='checkbox'
                        name='isUsagePolicyChecked'
                        checked={isUsagePolicyChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isUsagePolicyChecked ? 'icoChecked' : 'icoUnchecked'
                        }
                      ></span>
                      이용약관 동의
                      <span className='required'>(필수)</span>
                      <button
                        className='btnPolicy'
                        onClick={() =>
                          this.setState({ isUsagePolicyOpened: true })
                        }
                      >
                        약관보기 &gt;
                      </button>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type='checkbox'
                        name='isPIPolicy1Checked'
                        checked={isPIPolicy1Checked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isPIPolicy1Checked ? 'icoChecked' : 'icoUnchecked'
                        }
                      ></span>
                      개인정보 수집·이용 동의
                      <span className='required'>(필수)</span>
                      <button
                        className='btnPolicy'
                        onClick={() =>
                          this.setState({ isPIPolicy1Opened: true })
                        }
                      >
                        약관보기 &gt;
                      </button>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type='checkbox'
                        name='isPIPolicy2Checked'
                        checked={isPIPolicy2Checked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isPIPolicy2Checked ? 'icoChecked' : 'icoUnchecked'
                        }
                      ></span>
                      개인정보 수집·이용 동의
                      <span className='optional'>(선택)</span>
                      <button
                        className='btnPolicy'
                        onClick={() =>
                          this.setState({ isPIPolicy2Opened: true })
                        }
                      >
                        약관보기 &gt;
                      </button>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type='checkbox'
                        name='isMarketingChecked'
                        checked={isMarketingChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isMarketingChecked ? 'icoChecked' : 'icoUnchecked'
                        }
                      ></span>
                      무료배송, 할인쿠폰 등 혜택/정보 수신 동의
                      <span className='optional'>(선택)</span>
                    </label>
                  </div>
                  <div className='smsEmail'>
                    <span className='sms'>
                      <label>
                        <input
                          type='checkbox'
                          name='isSmsChecked'
                          checked={isSmsChecked}
                          onChange={clickPolicyCheckbox}
                        />
                        <span
                          className={
                            isSmsChecked ? 'icoChecked' : 'icoUnchecked'
                          }
                        ></span>
                        SMS
                      </label>
                    </span>
                    <span className='email'>
                      <label>
                        <input
                          type='checkbox'
                          name='isEmailChecked'
                          checked={isEmailChecked}
                          onChange={clickPolicyCheckbox}
                        />
                        <span
                          className={
                            isEmailChecked ? 'icoChecked' : 'icoUnchecked'
                          }
                        ></span>
                        이메일
                      </label>
                    </span>
                  </div>
                  <p className='noti2'>
                    동의 시 한 달간 [5% 적립] + [무제한 무료배송]
                    <span>&nbsp;&nbsp;(첫 주문 후 적용)</span>
                  </p>
                  <div className='age'>
                    <label>
                      <input
                        type='checkbox'
                        name='isOlderThanFourteenChecked'
                        checked={isOlderThanFourteenChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          isOlderThanFourteenChecked
                            ? 'icoChecked'
                            : 'icoUnchecked'
                        }
                      ></span>
                      본인은 만 14세 이상입니다.
                      <span className='required'>(필수)</span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button className='btnSignUp' onClick={signUp}>
            가입하기
          </button>
        </div>
        {isPolicyOpened && <div className='dim'></div>}
        {isUsagePolicyOpened && (
          <UsagePolicy clickConfirmBtn={clickConfirmBtn} />
        )}
        {isPIPolicy1Opened && (
          <PersonalInfoPolicy1 clickConfirmBtn={clickConfirmBtn} />
        )}
        {isPIPolicy2Opened && (
          <PersonalInfoPolicy2 clickConfirmBtn={clickConfirmBtn} />
        )}
      </div>
    );
  }
}
