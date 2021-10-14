import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  login = () => {
    const url = 'http://localhost:8000/users/login';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          console.log(res.token);
          this.props.history.push('/');
        } else {
          console.log('token error');
        }
      });
  };

  render() {
    const { handleInput, login } = this;
    const { account, password } = this.state;

    const isValidAccount = account.length > 0; // 상세 로직은 추후에 반영
    const isValidPw = password.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidAccount && isValidPw;

    return (
      <div className='Login'>
        <div className='loginContainer'>
          <h3>로그인</h3>
          <form>
            <input
              type='text'
              name='account'
              placeholder='아이디를 입력해주세요'
              onChange={handleInput}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='비밀번호를 입력해주세요'
              onChange={handleInput}
              required
            />
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
      </div>
    );
  }
}
