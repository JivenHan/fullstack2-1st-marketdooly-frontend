import React, { Component } from 'react';
import AlertPopup from './components/AlertPopup';
import UsagePolicy from './components/UsagePolicy';
import PersonalInfoPolicy1 from './components/PersonalInfoPolicy1';
import PersonalInfoPolicy2 from './components/PersonalInfoPolicy2';
import StringUtil from '../../utils/StringUtil';
import './SignUp.scss';

export default class SignUp extends Component {
  requiredInputMap = {
    account: '아이디',
    password: '비밀번호',
    passwordConfirm: '비밀번호 재입력',
    name: '이름',
    email: '이메일',
    phoneNumber: '휴대폰 번호',
    address: '주소',
  };

  optionalInputMap = {
    yyyy: '생년월일 년도',
    mm: '생년월일 월',
    dd: '생년월일 일',
  };

  requiredCheckboxMap = {
    isUsagePolicyChecked: '이용약관 동의',
    isPIRequiredPolicyChecked: '개인정보 수집·이용 동의',
    isOlderThanFourteenChecked: '만 14세 이상임',
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirm: '',
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: '',
      yyyy: '',
      mm: '',
      dd: '',

      isAccountDupChecked: false,
      isEmailDupChecked: false,
      isAgreeAllChecked: false,
      checkboxes: {
        isUsagePolicyChecked: false,
        isPIRequiredPolicyChecked: false,
        isPIOptionalPolicyChecked: false,
        isMarketingChecked: false,
        isSmsChecked: false,
        isEmailChecked: false,
        isOlderThanFourteenChecked: false,
      },
      isUsagePolicyOpened: false,
      isPIPolicy1Opened: false,
      isPIPolicy2Opened: false,
      alertPopupMessage: '',
      isAlertPopupOpened: false,
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  checkAccountDup = () => {
    if (this.checkInputValidation('account')) {
      alert('아이디 중복 조회 API 호출');
    }
  };

  checkEmailDup = () => {
    if (this.checkInputValidation('email')) {
      alert('이메일 중복 조회 API 호출');
    }
  };

  /**
   * 각 입력 값의 유효성을 검증
   * @param {string} propertyName 유효성을 검증할 state의 propertyName
   * @returns {boolean} 유효성 여부
   */
  checkInputValidation = propertyName => {
    const { requiredInputMap, optionalInputMap } = this;
    const {
      account,
      password,
      passwordConfirm,
      email,
      phoneNumber,
      yyyy,
      mm,
      dd,
    } = this.state;

    let alertPopupMessage = '';
    let isAlertPopupOpened = false;

    // 필수 입력 유효성 검증
    if (Object.keys(requiredInputMap).includes(propertyName)) {
      if (StringUtil.isNull(this.state[propertyName])) {
        alertPopupMessage = `${requiredInputMap[propertyName]}을(를) 입력해주세요`;
        isAlertPopupOpened = true;
      } else {
        let regExp = '';
        switch (propertyName) {
          case 'account':
            regExp = /^[0-9]*[a-z]+[0-9]*$/g;
            isAlertPopupOpened = account.length < 6 || !regExp.test(account);
            break;
          case 'password':
            isAlertPopupOpened = password.length < 10;
            break;
          case 'passwordConfirm':
            isAlertPopupOpened = password !== passwordConfirm;
            break;
          case 'email':
            regExp = /^[a-z0-9]+@[a-z0-9]+$/gi;
            isAlertPopupOpened = !regExp.test(email);
            break;
          case 'phoneNumber':
            regExp = /^0[0-9]{9,10}$/g;
            isAlertPopupOpened = !regExp.test(phoneNumber);
            break;
          default:
            break;
        }
        alertPopupMessage = `${requiredInputMap[propertyName]} 형식을 확인해주세요`;
      }
    }

    // 선택 입력 유효성 검증
    if (Object.keys(optionalInputMap).includes(propertyName)) {
      if (
        !StringUtil.isNull(yyyy) ||
        !StringUtil.isNull(mm) ||
        !StringUtil.isNull(dd)
      ) {
        if (
          yyyy.length < 4 ||
          mm.length < 2 ||
          dd.length < 2 ||
          yyyy < 1900 ||
          yyyy > new Date().getFullYear() ||
          mm < 1 ||
          mm > 12 ||
          dd < 1 ||
          dd > 31 ||
          yyyy + mm + dd < new Date().get
        ) {
          alertPopupMessage = '생년월일 형식을 확인해주세요';
          isAlertPopupOpened = true;
        }
      }
    }

    // 필수 동의 체크박스
    if (Object.keys(this.requiredCheckboxMap).includes(propertyName)) {
      if (this.state.checkboxes[propertyName] === false) {
        alertPopupMessage = `${this.requiredCheckboxMap[propertyName]}을(를) 확인해주세요`;
        isAlertPopupOpened = true;
      }
    }

    this.setState({ alertPopupMessage, isAlertPopupOpened });

    return !isAlertPopupOpened;
  };

  clickGenderRadio = e => {
    this.setState({ gender: e.target.value });
  };

  clickPolicyCheckbox = e => {
    const { name, checked } = e.target;
    const { checkboxes } = this.state;

    const newObj = {};

    for (const [key, value] of Object.entries(checkboxes)) {
      if (name === key) {
        newObj[key] = !value;
      } else {
        newObj[key] = value;
      }
    }

    // 마케팅 전체동의
    if (name === 'isMarketingChecked') {
      newObj.isSmsChecked = newObj.isMarketingChecked;
      newObj.isEmailChecked = newObj.isMarketingChecked;
    }
    newObj.isMarketingChecked = newObj.isSmsChecked && newObj.isEmailChecked;

    // 전체동의
    if (name === 'isAgreeAllChecked') {
      Object.keys(newObj).forEach(el => (newObj[el] = checked));
    }

    this.setState({
      isAgreeAllChecked: !Object.values(newObj).includes(false),
      checkboxes: newObj,
    });
  };

  clickConfirmBtn = () => {
    this.setState({
      isUsagePolicyOpened: false,
      isPIPolicy1Opened: false,
      isPIPolicy2Opened: false,
      isAlertPopupOpened: false,
    });
  };

  clickSignUpBtn = () => {
    const propertyNameList = [
      'account',
      'password',
      'passwordConfirm',
      'name',
      'email',
      'phoneNumber',
      'address',
      'yyyy',
      'mm',
      'dd',
      'isUsagePolicyChecked',
      'isPIRequiredPolicyChecked',
      'isOlderThanFourteenChecked',
    ];

    let isInputValid = true;
    for (const propertyName of propertyNameList) {
      if (!this.checkInputValidation(propertyName)) {
        isInputValid = false;
        break;
      }
    }

    if (isInputValid) {
      alert('회원가입 API 호출');
    }
  };

  render() {
    const {
      inputHandler,
      checkAccountDup,
      checkEmailDup,
      clickGenderRadio,
      clickPolicyCheckbox,
      clickConfirmBtn,
      clickSignUpBtn,
    } = this;

    const {
      gender,
      isAgreeAllChecked,
      checkboxes,
      isUsagePolicyOpened,
      isPIPolicy1Opened,
      isPIPolicy2Opened,
      alertPopupMessage,
      isAlertPopupOpened,
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
                  <input
                    type='text'
                    name='account'
                    maxLength='15'
                    placeholder='6자 이상의 영문 혹은 영문과 숫자를 조합'
                    onChange={inputHandler}
                  />
                  <button className='btnAccountDup' onClick={checkAccountDup}>
                    중복확인
                  </button>
                </td>
              </tr>
              <tr>
                <th>
                  비밀번호<span className='asterisk'>*</span>
                </th>
                <td>
                  <input
                    type='password'
                    name='password'
                    maxLength='15'
                    placeholder='비밀번호를 입력해주세요'
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  비밀번호 재입력<span className='asterisk'>*</span>
                </th>
                <td>
                  <input
                    type='password'
                    name='passwordConfirm'
                    maxLength='15'
                    placeholder='비밀번호를 한번 더 입력해주세요'
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  이름<span className='asterisk'>*</span>
                </th>
                <td>
                  <input
                    type='text'
                    name='name'
                    maxLength='15'
                    placeholder='이름을 입력해주세요'
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  이메일<span className='asterisk'>*</span>
                </th>
                <td>
                  <input
                    name='email'
                    placeholder='예: marketdooly@wecode.com'
                    onChange={inputHandler}
                  />
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
                  <input
                    type='text'
                    name='phoneNumber'
                    maxLength='12'
                    placeholder='숫자만 입력해주세요'
                    onChange={inputHandler}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  주소<span className='asterisk'>*</span>
                </th>
                <td>
                  <input
                    name='address'
                    placeholder='주소를 입력해주세요'
                    onChange={inputHandler}
                  />
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
                      onChange={clickGenderRadio}
                    />
                    남자
                  </label>
                  <label>
                    <input
                      type='radio'
                      value='female'
                      checked={gender === 'female'}
                      onChange={clickGenderRadio}
                    />
                    여자
                  </label>
                  <label>
                    <input
                      type='radio'
                      value=''
                      checked={gender === ''}
                      onChange={clickGenderRadio}
                    />
                    선택 안함
                  </label>
                </td>
              </tr>
              <tr className='birthday'>
                <th>생년월일</th>
                <td>
                  <div className='yyyymmdd'>
                    <input
                      name='yyyy'
                      maxLength='4'
                      placeholder='YYYY'
                      onChange={inputHandler}
                    />
                    <span>/</span>
                    <input
                      name='mm'
                      maxLength='2'
                      placeholder='MM'
                      onChange={inputHandler}
                    />
                    <span>/</span>
                    <input
                      name='dd'
                      maxLength='2'
                      placeholder='DD'
                      onChange={inputHandler}
                    />
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
                        checked={checkboxes.isUsagePolicyChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          checkboxes.isUsagePolicyChecked
                            ? 'icoChecked'
                            : 'icoUnchecked'
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
                        name='isPIRequiredPolicyChecked'
                        checked={checkboxes.isPIRequiredPolicyChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          checkboxes.isPIRequiredPolicyChecked
                            ? 'icoChecked'
                            : 'icoUnchecked'
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
                        name='isPIOptionalPolicyChecked'
                        checked={checkboxes.isPIOptionalPolicyChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          checkboxes.isPIOptionalPolicyChecked
                            ? 'icoChecked'
                            : 'icoUnchecked'
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
                        checked={checkboxes.isMarketingChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          checkboxes.isMarketingChecked
                            ? 'icoChecked'
                            : 'icoUnchecked'
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
                          checked={checkboxes.isSmsChecked}
                          onChange={clickPolicyCheckbox}
                        />
                        <span
                          className={
                            checkboxes.isSmsChecked
                              ? 'icoChecked'
                              : 'icoUnchecked'
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
                          checked={checkboxes.isEmailChecked}
                          onChange={clickPolicyCheckbox}
                        />
                        <span
                          className={
                            checkboxes.isEmailChecked
                              ? 'icoChecked'
                              : 'icoUnchecked'
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
                        checked={checkboxes.isOlderThanFourteenChecked}
                        onChange={clickPolicyCheckbox}
                      />
                      <span
                        className={
                          checkboxes.isOlderThanFourteenChecked
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
          <button className='btnSignUp' onClick={clickSignUpBtn}>
            가입하기
          </button>
        </div>
        <div className='popupContainer'>
          {(isPolicyOpened || isAlertPopupOpened) && (
            <div className='dim'></div>
          )}
          {isUsagePolicyOpened && (
            <UsagePolicy clickConfirmBtn={clickConfirmBtn} />
          )}
          {isPIPolicy1Opened && (
            <PersonalInfoPolicy1 clickConfirmBtn={clickConfirmBtn} />
          )}
          {isPIPolicy2Opened && (
            <PersonalInfoPolicy2 clickConfirmBtn={clickConfirmBtn} />
          )}
          {isAlertPopupOpened && (
            <AlertPopup
              alertMessage={alertPopupMessage}
              clickConfirmBtn={clickConfirmBtn}
            />
          )}
        </div>
      </div>
    );
  }
}
