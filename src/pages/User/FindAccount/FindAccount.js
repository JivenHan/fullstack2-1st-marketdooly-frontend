import { Component } from 'react';
import AlertPopup from '../SignUp/components/AlertPopup';
import StringUtil from '../../../utils/StringUtil';
import './FindAccount.scss';
import TextInput from '../components/TextInput';

export default class FindAccount extends Component {
  requiredInputMap = {
    name: '이름',
    email: '이메일',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      alertPopupMessage: '',
      isAlertPopupOpened: false,
      responseStatus: '',
      account: '',
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
    const { email } = this.state;

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

  findAccount = () => {
    const keyList = ['name', 'email'];

    let isInputValid = true;
    for (const key of keyList) {
      if (!this.checkInputValidation(key)) {
        isInputValid = false;
        break;
      }
    }

    if (isInputValid) {
      const url = 'http://localhost:8000/users/account';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            responseStatus: res.status,
            account: res.message[0].account,
          });
        });
    }
  };

  render() {
    const { inputHandler, clickPopupConfirmBtn, findAccount } = this;
    const {
      name,
      email,
      alertPopupMessage,
      isAlertPopupOpened,
      responseStatus,
      account,
    } = this.state;

    const isValidName = name.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = email.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidEmail;

    return (
      <div className='FindAccount'>
        <div className='findAccountContainer'>
          <h3>아이디 찾기</h3>
          {responseStatus === '' && (
            <div className='beforeFind'>
              <form>
                <label>이름</label>
                <TextInput input='name' onChange={inputHandler} />
                <label>이메일</label>
                <TextInput input='email' onChange={inputHandler} />
              </form>
              <button
                type='button'
                className={isValidInput ? 'btnLogin valid' : 'btnLogin invalid'}
                onClick={findAccount}
              >
                확인
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
                아이디 다시 찾기
              </button>
            </div>
          )}
          {responseStatus === 'success' && (
            <div className='afterFind'>
              <img src='/image/findaccount.png' alt='' />
              <p>
                고객님의 아이디는
                <br />
                {account} 입니다.
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
