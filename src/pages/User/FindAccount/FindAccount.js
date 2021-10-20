import { Component } from 'react';
import TextInput from '../components/TextInput';
import ResultPage from '../components/ResultPage';
import AlertModal from '../../../components/Modal/AlertModal';
import StringUtil from '../../../utils/StringUtil';
import './FindAccount.scss';

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
      modalMessage: '',
      modalVisibility: false,
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
          case 'email':
            regExp = /^[a-z0-9]+@[a-z0-9]+.[a-z0-9]+$/gi;
            modalVisibility = !regExp.test(email);
            break;
          default:
            break;
        }
        modalMessage = `${requiredInputMap[key]} 형식을 확인해주세요`;
      }
    }

    this.setState({ modalMessage, modalVisibility });
    return !modalVisibility;
  };

  clickConfirmBtn = () => {
    this.setState({ responseStatus: '' });
  };

  closeModal = () => {
    this.setState({ modalVisibility: false });
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
    const { inputHandler, clickConfirmBtn, closeModal, findAccount } = this;
    const {
      name,
      email,
      modalMessage,
      modalVisibility,
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
            <ResultPage
              mainText={`고객님께서 입력하신 정보가<br>정확한지 확인 후 다시 시도해주세요`}
              btnText={`아이디 다시 찾기`}
              onClick={clickConfirmBtn}
            />
          )}
          {responseStatus === 'success' && (
            <ResultPage
              mainText={`고객님의 아이디는<br>${account} 입니다.`}
              btnText={`로그인 하기`}
              onClick={clickConfirmBtn}
            />
          )}
        </div>
        <div className='modalContainer'>
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
