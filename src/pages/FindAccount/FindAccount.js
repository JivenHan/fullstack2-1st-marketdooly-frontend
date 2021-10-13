import { Component } from 'react';
import './FindAccount.scss';

export default class FindAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  findAccount = () => {
    const url = 'http://localhost:8000/users/account';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(console.log);
  };

  render() {
    const { handleInput, findAccount } = this;
    const { name, email } = this.state;

    const isValidName = name.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = email.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidEmail;

    return (
      <div className='FindAccount'>
        <div className='findAccountContainer'>
          <h3>아이디 찾기</h3>
          <form id='userInfoForm' action='./findAccount' method='POST'>
            <label>이름</label>
            <input
              type='text'
              name='name'
              placeholder='고객님의 이름을 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>이메일</label>
            <input
              type='text'
              name='email'
              placeholder='가입 시 등록하신 이메일 주소를 입력해주세요'
              onChange={handleInput}
              required
            />
          </form>
          <button
            type='button'
            className={isValidInput ? 'btnLogin valid' : 'btnLogin invalid'}
            onClick={findAccount}
          >
            확인
          </button>
        </div>
      </div>
    );
  }
}
