import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userPassword: '',
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleInput } = this;
    const { userId, userPassword } = this.state;

    const isValidId = userId.length > 0; // 상세 로직은 추후에 반영
    const isValidPw = userPassword.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidId && isValidPw;

    return (
      <div className='Login'>
        <div className='loginContainer'>
          <h3>로그인</h3>
          <form id='userInfoForm' action='./login' method='POST'>
            <input
              type='text'
              name='userId'
              placeholder='아이디를 입력해주세요'
              onChange={handleInput}
              required
            />
            <input
              type='password'
              name='userPassword'
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
              <Link to='./findId'>아이디 찾기</Link>
              <span> | </span>
              <Link to='./findPw'>비밀번호 찾기</Link>
            </div>
          </div>
          <button
            type='button'
            className={isValidInput ? 'btnLogin valid' : 'btnLogin invalid'}
            form='userInfoForm'
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
