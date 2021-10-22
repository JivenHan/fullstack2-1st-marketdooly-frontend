import { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import AlertModal from '../../../components/Modal/AlertModal';
import StringUtil from '../../../utils/StringUtil';
import './Login.scss';

export default class Login extends Component {
  requiredInputMap = {
    account: '아이디',
    password: '비밀번호',
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      modalMessage: '',
      modalVisibility: false,
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
    const { account, password } = this.state;

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
          default:
            break;
        }
        modalMessage = `${requiredInputMap[key]} 형식을 확인해주세요`;
      }
    }

    this.setState({ modalMessage, modalVisibility });
    return !modalVisibility;
  };

  closeModal = () => {
    this.setState({ modalVisibility: false });
  };

  login = () => {
    const keyList = ['account', 'password'];

    let isInputValid = true;
    for (const key of keyList) {
      if (!this.checkInputValidation(key)) {
        isInputValid = false;
        break;
      }
    }

    if (isInputValid) {
      const url = 'http://localhost:8000/users/login';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
        .then(res => res.json())
        .then(async res => {
          const deleteCookie = name => {
            document.cookie =
              name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
          };
          deleteCookie('jwt');
          document.cookie = 'jwt=' + res.token;
          return res;
        })
        .then(res => {
          if (res.token) {
            sessionStorage.setItem('token', res.token);
            console.log(res);
            sessionStorage.setItem('name', res.data[0].name);
            const { id, name } = res.data[0];
            this.props.authentication({ id, name });
            this.props.history.push('/');
          } else {
            this.setState({
              modalMessage: '회원 정보가 일치하지 않습니다',
              modalVisibility: true,
            });
          }
        });
    }
  };

  render() {
    const { inputHandler, closeModal, login } = this;
    const { account, password, modalMessage, modalVisibility } = this.state;

    const isValidAccount = account.length > 0; // 상세 로직은 추후에 반영
    const isValidPw = password.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidAccount && isValidPw;

    return (
      <div className='Login'>
        <div className='loginContainer'>
          <h3>로그인</h3>
          <form>
            <TextInput input='account' onChange={inputHandler} />
            <TextInput input='password' onChange={inputHandler} />
          </form>
          <div className='aaa'>
            <div className='securityLogin'>
              <input type='checkbox' />
              <label>보안접속</label>
            </div>
            <div className='findUserInfo'>
              <Link to='./findaccount'>아이디 찾기</Link>
              <span> | </span>
              <Link to='./findpw'>비밀번호 찾기</Link>
            </div>
          </div>
          <button
            type='button'
            className={isValidInput ? 'btnLogin valid' : 'btnLogin invalid'}
            onClick={login}
          >
            로그인
          </button>
          <button
            type='button'
            className='btnSignUp'
            onClick={() => this.props.history.push('./signup')}
          >
            회원가입
          </button>
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
