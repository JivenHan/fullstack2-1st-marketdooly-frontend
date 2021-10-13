import { Component } from 'react';
import './FindPw.scss';

export default class FindPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      account: '',
      email: '',
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  findPw = () => {
    const url = 'http://localhost:8000/users/pw';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(console.log);
  };

  render() {
    const { handleInput, findPw } = this;
    const { name, account, email } = this.state;

    const isValidName = name.length > 0; // 상세 로직은 추후에 반영
    const isValidId = account.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = email.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidId && isValidEmail;

    return (
      <div className='FindPw'>
        <div className='findPwContainer'>
          <h3>비밀번호 찾기</h3>
          <form>
            <label>이름</label>
            <input
              type='text'
              name='name'
              placeholder='고객님의 이름을 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>아이디</label>
            <input
              type='text'
              name='account'
              placeholder='가입 시 등록하신 아이디를 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>이메일</label>
            <input
              type='email'
              name='email'
              placeholder='가입 시 등록하신 이메일 주소를 입력해주세요'
              onChange={handleInput}
              required
            />
          </form>
          <button
            type='button'
            className={isValidInput ? 'btnFind valid' : 'btnFind invalid'}
            onClick={findPw}
          >
            찾기
          </button>
        </div>
      </div>
    );
  }
}
