import { Component } from 'react';
import './FindPw.scss';

export default class FindPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userId: '',
      userEmail: '',
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
    const { userName, userId, userEmail } = this.state;

    const isValidName = userName.length > 0; // 상세 로직은 추후에 반영
    const isValidId = userId.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = userEmail.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidId && isValidEmail;

    return (
      <div className='FindPw'>
        <div className='findPwContainer'>
          <h3>비밀번호 찾기</h3>
          <form id='userInfoForm' action='./findPw' method='POST'>
            <label>이름</label>
            <input
              type='text'
              name='userName'
              placeholder='고객님의 이름을 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>아이디</label>
            <input
              type='text'
              name='userId'
              placeholder='가입 시 등록하신 아이디를 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>이메일</label>
            <input
              type='email'
              name='userEmail'
              placeholder='가입 시 등록하신 이메일 주소를 입력해주세요'
              onChange={handleInput}
              required
            />
          </form>
          <button
            className={isValidInput ? 'btnFind valid' : 'btnFind invalid'}
            form='userInfoForm'
          >
            찾기
          </button>
        </div>
      </div>
    );
  }
}
