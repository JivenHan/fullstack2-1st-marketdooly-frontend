import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

export default class Login extends Component {
  render() {
    return (
      <div className='Login'>
        <div className='loginContainer'>
          <h3>로그인</h3>
          <input name='userId' placeholder='아이디를 입력해주세요'></input>
          <input name='password' placeholder='비밀번호를 입력해주세요'></input>
          <div className='aaa'>
            <div className='securityLogin'>
              <input type='checkbox' name='security' />
              <label for='security'>보안접속</label>
            </div>
            <div className='findUserInfo'>
              <Link to='./'>아이디 찾기</Link>
              <span> | </span>
              <Link to='./'>비밀번호 찾기</Link>
            </div>
          </div>
          <button className='btnLogin'>로그인</button>
          <button className='btnSignIn'>회원가입</button>
        </div>
      </div>
    );
  }
}
