import { Component } from 'react';
import TextInput from '../components/TextInput';
import ResultPage from '../components/ResultPage';
import AlertModal from '../../../components/Modal/AlertModal';
import StringUtil from '../../../utils/StringUtil';
import { API_ENDPOINT } from '../../../api';
import './FindPw.scss';

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
      modalMessage: '',
      modalVisibility: false,
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

  goToLogin = () => {
    this.props.history.push('/login');
  };

  closeModal = () => {
    this.setState({ modalVisibility: false });
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
      const url = `${API_ENDPOINT}/users/pw`;
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
    const { inputHandler, clickConfirmBtn, goToLogin, closeModal, findPw } =
      this;
    const {
      name,
      account,
      email,
      modalMessage,
      modalVisibility,
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
            <ResultPage
              mainText={`고객님께서 입력하신 정보가<br>정확한지 확인 후 다시 시도해주세요`}
              btnText={`비밀번호 다시 찾기`}
              onClick={clickConfirmBtn}
            />
          )}
          {responseStatus === 'success' && (
            <ResultPage
              mainText={`임시 비밀번호는<br>${tempPassword} 입니다.`}
              btnText={`로그인 하기`}
              onClick={goToLogin}
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
