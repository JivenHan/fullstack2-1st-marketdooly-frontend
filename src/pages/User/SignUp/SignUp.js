import { Component } from 'react';
import UsagePolicy from './components/UsagePolicy';
import PersonalInfoPolicy1 from './components/PersonalInfoPolicy1';
import PersonalInfoPolicy2 from './components/PersonalInfoPolicy2';
import TableRow from '../components/TableRow';
import TextInput from '../components/TextInput';
import PolicyCheckbox from '../components/PolicyCheckbox';
import ResultPage from '../components/ResultPage';
import AlertModal from '../../../components/Modal/AlertModal';
import DimBackground from '../../../components/Modal/DimBackground';
import StringUtil from '../../../utils/StringUtil';
import { API_ENDPOINT } from '../../../api';
import './SignUp.scss';

export default class SignUp extends Component {
  requiredInputMap = {
    account: '아이디',
    password: '비밀번호',
    passwordConfirm: '비밀번호 재입력',
    name: '이름',
    email: '이메일',
    cellPhone: '휴대폰 번호',
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
      // 필수 입력
      account: '',
      password: '',
      passwordConfirm: '',
      name: '',
      email: '',
      cellPhone: '',
      address: '',
      // 선택 입력
      gender: '',
      yyyy: '',
      mm: '',
      dd: '',
      // 중복 체크
      isAccountDup: true,
      isEmailDup: true,
      // 약관 동의
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
      // 팝업 상태 관리
      isUsagePolicyOpened: false,
      isPIRequiredPolicyOpened: false,
      isPIOptionalPolicyOpened: false,
      modalMessage: '',
      modalVisibility: false,
      // 회원가입 결과
      signUpResult: false,
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
      const url = `${API_ENDPOINT}/users/duplicate/account`;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: this.state.account }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 'fail') {
            this.setState({
              modalMessage: `이미 사용 중인 아이디 입니다.`,
              modalVisibility: true,
            });
          } else if (res.status === 'success') {
            this.setState({
              modalMessage: `사용 가능한 아이디 입니다.`,
              modalVisibility: true,
            });
          }
        });
    }
  };

  checkEmailDup = () => {
    if (this.checkInputValidation('email')) {
      const url = `${API_ENDPOINT}/users/duplicate/email`;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 'fail') {
            this.setState({
              modalMessage: `이미 사용 중인 이메일 입니다.`,
              modalVisibility: true,
            });
          } else if (res.status === 'success') {
            this.setState({
              modalMessage: `사용 가능한 이메일 입니다.`,
              modalVisibility: true,
            });
          }
        });
    }
  };

  cellPhoneAuth = () => {
    this.setState({
      modalMessage: '휴대폰 인증 API 호출',
      modalVisibility: true,
    });
  };

  /**
   * 각 입력 값의 유효성을 검증
   * @param {string} key state의 key
   * @returns {boolean} 유효성 여부
   */
  checkInputValidation = key => {
    const { requiredInputMap, optionalInputMap } = this;
    const {
      account,
      password,
      passwordConfirm,
      email,
      cellPhone,
      yyyy,
      mm,
      dd,
    } = this.state;

    let modalMessage = '';
    let modalVisibility = false;

    // 필수 입력 유효성 검증
    if (Object.keys(requiredInputMap).includes(key)) {
      if (StringUtil.isNull(this.state[key])) {
        modalMessage = `${requiredInputMap[key]}을(를) 입력해주세요`;
        modalVisibility = true;
      } else {
        let regExp = '';
        switch (key) {
          case 'account':
            regExp = /^[a-z0-9]*[a-z]+[a-z0-9]*$/g;
            modalVisibility = account.length < 6 || !regExp.test(account);
            break;
          case 'password':
            modalVisibility = password.length < 10;
            break;
          case 'passwordConfirm':
            modalVisibility = password !== passwordConfirm;
            break;
          case 'email':
            regExp = /^[a-z0-9]+@[a-z0-9]+.[a-z0-9]+$/gi;
            modalVisibility = !regExp.test(email);
            break;
          case 'cellPhone':
            regExp = /^0[0-9]{9,10}$/g;
            modalVisibility = !regExp.test(cellPhone);
            break;
          default:
            break;
        }
        modalMessage = `${requiredInputMap[key]} 형식을 확인해주세요`;
      }
    }

    // 선택 입력 유효성 검증
    if (Object.keys(optionalInputMap).includes(key)) {
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
          modalMessage = '생년월일 형식을 확인해주세요';
          modalVisibility = true;
        }
      }
    }

    // 필수 동의 체크박스
    if (Object.keys(this.requiredCheckboxMap).includes(key)) {
      if (this.state.checkboxes[key] === false) {
        modalMessage = `${this.requiredCheckboxMap[key]}을(를) 확인해주세요`;
        modalVisibility = true;
      }
    }

    this.setState({ modalMessage, modalVisibility });

    return !modalVisibility;
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

  openPolicyPopup = name => {
    this.setState({ [name]: true });
  };

  goToLogin = () => {
    this.props.history.push('/login');
  };

  closeModal = () => {
    this.setState({
      isUsagePolicyOpened: false,
      isPIRequiredPolicyOpened: false,
      isPIOptionalPolicyOpened: false,
      modalVisibility: false,
    });
  };

  signUp = () => {
    const keyList = [
      'account',
      'password',
      'passwordConfirm',
      'name',
      'email',
      'cellPhone',
      'address',
      'yyyy',
      'mm',
      'dd',
      'isUsagePolicyChecked',
      'isPIRequiredPolicyChecked',
      'isOlderThanFourteenChecked',
    ];

    let isInputValid = true;
    for (const key of keyList) {
      if (!this.checkInputValidation(key)) {
        isInputValid = false;
        break;
      }
    }

    if (isInputValid) {
      const { cellPhone, yyyy, mm, dd } = this.state;
      const {
        isPIRequiredPolicyChecked,
        isPIOptionalPolicyChecked,
        isMarketingChecked,
        isOlderThanFourteenChecked,
      } = this.state.checkboxes;

      this.setState(
        {
          phone_number: cellPhone,
          birthday: yyyy + mm + dd,
          mandatory_policy_agreed:
            isPIRequiredPolicyChecked && isOlderThanFourteenChecked,
          personal_information_policy_agreed: isPIOptionalPolicyChecked,
          marketing_policy_agreed: isMarketingChecked,
        },
        () => {
          const url = `${API_ENDPOINT}/users/signup`;
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
          })
            .then(res => res.json())
            .then(res => {
              if (res.status === 'success') {
                this.setState({
                  signUpResult: true,
                });
              } else {
                this.setState({
                  signUpResult: false,
                  modalMessage: `회원가입 과정에서 오류가 발생하였습니다`,
                  modalVisibility: true,
                });
              }
            });
        }
      );
    }
  };

  render() {
    const {
      inputHandler,
      checkAccountDup,
      checkEmailDup,
      cellPhoneAuth,
      clickGenderRadio,
      clickPolicyCheckbox,
      openPolicyPopup,
      goToLogin,
      closeModal,
      signUp,
    } = this;

    const {
      account,
      gender,
      isAgreeAllChecked,
      checkboxes,
      isUsagePolicyOpened,
      isPIRequiredPolicyOpened,
      isPIOptionalPolicyOpened,
      modalMessage,
      modalVisibility,
      signUpResult,
    } = this.state;

    const isPolicyOpened =
      isUsagePolicyOpened ||
      isPIRequiredPolicyOpened ||
      isPIOptionalPolicyOpened;

    return (
      <div className='SignUp'>
        {!signUpResult && (
          <div className='signUpContainer'>
            <h2>회원가입</h2>
            <p className='asterisk'>
              <span className='asterisk'>*</span>필수입력사항
            </p>
            <table className='userInfo'>
              <tbody>
                <TableRow
                  input='account'
                  onChange={inputHandler}
                  onClick={checkAccountDup}
                />
                <tr>
                  <th></th>
                  <td>
                    <p>&#183; 6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                    <p>&#183; 아이디 중복확인</p>
                  </td>
                </tr>
                <TableRow input='password' onChange={inputHandler} />
                <tr>
                  <th></th>
                  <td>
                    <p>&#183; 6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                    <p>&#183; 아이디 중복확인</p>
                  </td>
                </tr>
                <TableRow input='passwordConfirm' onChange={inputHandler} />
                <tr>
                  <th></th>
                  <td>
                    <p>&#183; 6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                    <p>&#183; 아이디 중복확인</p>
                  </td>
                </tr>
                <TableRow input='name' onChange={inputHandler} />
                <TableRow
                  input='email'
                  onChange={inputHandler}
                  onClick={checkEmailDup}
                />
                <tr>
                  <th></th>
                  <td>
                    <p>&#183; 6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                    <p>&#183; 아이디 중복확인</p>
                  </td>
                </tr>
                <TableRow
                  input='cellPhone'
                  onChange={inputHandler}
                  onClick={cellPhoneAuth}
                />
                <tr>
                  <th></th>
                  <td>
                    <p>&#183; 6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                    <p>&#183; 아이디 중복확인</p>
                  </td>
                </tr>
                <TableRow input='address' onChange={inputHandler} />
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
                      <TextInput input='yyyy' onChange={inputHandler} />
                      <span>/</span>
                      <TextInput input='mm' onChange={inputHandler} />
                      <span>/</span>
                      <TextInput input='dd' onChange={inputHandler} />
                    </div>
                  </td>
                </tr>
                <tr className='policies'>
                  <th>
                    이용약관동의<span className='asterisk'>*</span>
                  </th>
                  <td>
                    <PolicyCheckbox
                      input='all'
                      state={isAgreeAllChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                    <p className='noti1'>
                      선택항목에 동의하지 않은 경우도 회원가입 및 일반적인
                      서비스를 이용할 수 있습니다.
                    </p>
                    <PolicyCheckbox
                      input='usage'
                      state={checkboxes.isUsagePolicyChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                    <PolicyCheckbox
                      input='piRequired'
                      state={checkboxes.isPIRequiredPolicyChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                    <PolicyCheckbox
                      input='piOptional'
                      state={checkboxes.isPIOptionalPolicyChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                    <PolicyCheckbox
                      input='marketing'
                      state={checkboxes.isMarketingChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                    <div className='marketing'>
                      <PolicyCheckbox
                        input='sms'
                        state={checkboxes.isSmsChecked}
                        handler={{ clickPolicyCheckbox, openPolicyPopup }}
                      />
                      <PolicyCheckbox
                        input='email'
                        state={checkboxes.isEmailChecked}
                        handler={{ clickPolicyCheckbox, openPolicyPopup }}
                      />
                      <p className='noti2'>
                        동의 시 한 달간 [5% 적립] + [무제한 무료배송]
                        <span>&nbsp;&nbsp;(첫 주문 후 적용)</span>
                      </p>
                    </div>
                    <PolicyCheckbox
                      input='fourteen'
                      state={checkboxes.isOlderThanFourteenChecked}
                      handler={{ clickPolicyCheckbox, openPolicyPopup }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type='button' className='btnSignUp' onClick={signUp}>
              가입하기
            </button>
          </div>
        )}
        {signUpResult && (
          <ResultPage
            mainText={`회원가입이 완료되었습니다 !<br>회원님의 아이디는 ${account} 입니다.`}
            btnText={`로그인 하기`}
            onClick={goToLogin}
          />
        )}
        <div className='modalContainer'>
          {isPolicyOpened && <DimBackground />}
          {isUsagePolicyOpened && <UsagePolicy onClick={closeModal} />}
          {isPIRequiredPolicyOpened && (
            <PersonalInfoPolicy1 onClick={closeModal} />
          )}
          {isPIOptionalPolicyOpened && (
            <PersonalInfoPolicy2 onClick={closeModal} />
          )}
          <AlertModal
            visibility={modalVisibility}
            headerTxt='알림메시지'
            message={modalMessage}
            confirmMsg='확인'
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}
