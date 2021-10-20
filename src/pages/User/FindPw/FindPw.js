import { Component } from 'react';
import AlertPopup from '../SignUp/components/AlertPopup';
import StringUtil from '../../../utils/StringUtil';
import './FindPw.scss';
import TextInput from '../components/TextInput';

export default class FindPw extends Component {
  requiredInputMap = {
    name: '이름',
    account: '아이디',
    email: '이메일',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      account: '',
      email: '',
      alertPopupMessage: '',
      isAlertPopupOpened: false,
      responseStatus: '',
      tempPassword: '',
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  checkInputValidation = key => {
    const { requiredInputMap } = this;
    const { account, email } = this.state;

    let alertPopupMessage = '';
    let isAlertPopupOpened = false;

    // 필수 입력 유효성 검증
    if (Object.keys(requiredInputMap).includes(key)) {
      if (StringUtil.isNull(this.state[key])) {
        alertPopupMessage = `${requiredInputMap[key]}을(를) 입력해주세요`;
        isAlertPopupOpened = true;
      } else {
        let regExp = '';
        switch (key) {
          case 'account':
            regExp = /^[a-z0-9]*[a-z]+[a-z0-9]*$/g;
            isAlertPopupOpened = account.length < 6 || !regExp.test(account);
            break;
          case 'email':
            regExp = /^[a-z0-9]+@[a-z0-9]+.[a-z0-9]+$/gi;
            isAlertPopupOpened = !regExp.test(email);
            break;
          default:
            break;
        }
        alertPopupMessage = `${requiredInputMap[key]} 형식을 확인해주세요`;
      }
    }

    this.setState({ alertPopupMessage, isAlertPopupOpened });
    return !isAlertPopupOpened;
  };

  clickPopupConfirmBtn = () => {
    this.setState({ isAlertPopupOpened: false });
  };

  findPw = () => {
    const keyList = ['name', 'account', 'email'];

    let isInputValid = true;
    for (const key of keyList) {
      if (!this.checkInputValidation(key)) {
        isInputValid = false;
        break;
      }
    }

    if (isInputValid) {
      const url = 'http://localhost:8000/users/pw';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            responseStatus: res.status,
            tempPassword: res.tempPW,
          });
        });
    }
  };

  render() {
    const { inputHandler, clickPopupConfirmBtn, findPw } = this;
    const {
      name,
      account,
      email,
      alertPopupMessage,
      isAlertPopupOpened,
      responseStatus,
      tempPassword,
    } = this.state;

    const isValidName = name.length > 0; // 상세 로직은 추후에 반영
    const isValidAccount = account.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = email.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidAccount && isValidEmail;

    return (
      <div className='FindPw'>
        <div className='findPwContainer'>
          <h3>비밀번호 찾기</h3>
          {responseStatus === '' && (
            <div className='beforeFind'>
              <form>
                <label>이름</label>
                <TextInput input='name' onChange={inputHandler} />
                <label>아이디</label>
                <TextInput input='account' onChange={inputHandler} />
                <label>이메일</label>
                <TextInput input='email' onChange={inputHandler} />
              </form>
              <button
                type='button'
                className={isValidInput ? 'btnFind valid' : 'btnFind invalid'}
                onClick={findPw}
              >
                찾기
              </button>
            </div>
          )}
          {responseStatus === 'fail' && (
            <div className='afterFind'>
              <img src='/image/findaccount.png' alt='' />
              <p>
                고객님께서 입력하신 정보가
                <br />
                정확한지 확인 후 다시 시도해주세요
              </p>
              <button
                type='button'
                onClick={() => this.setState({ responseStatus: '' })}
              >
                비밀번호 다시 찾기
              </button>
            </div>
          )}
          {responseStatus === 'success' && (
            <div className='afterFind'>
              <img src='/image/findaccount.png' alt='' />
              <p>
                임시 비밀번호는
                <br />
                {tempPassword} 입니다.
              </p>
              <button
                type='button'
                onClick={() => this.props.history.push('/login')}
              >
                로그인 하기
              </button>
            </div>
          )}
        </div>
        <div className='popupContainer'>
          {isAlertPopupOpened && <div className='dim'></div>}
          {isAlertPopupOpened && (
            <AlertPopup
              alertMessage={alertPopupMessage}
              clickConfirmBtn={clickPopupConfirmBtn}
            />
          )}
        </div>
      </div>
    );
  }
}
