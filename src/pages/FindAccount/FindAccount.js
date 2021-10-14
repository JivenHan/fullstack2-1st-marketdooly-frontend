import { Component } from 'react';
import './FindAccount.scss';

export default class FindAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      findResult: '',
      account: '',
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
      .then(res => {
        this.setState({
          findResult: res.status,
          account: res.message[0].account,
        });
      });
  };

  render() {
    const { handleInput, findAccount } = this;
    const { name, email, findResult, account } = this.state;

    const isValidName = name.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = email.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidEmail;

    return (
      <div className='FindAccount'>
        <div className='findAccountContainer'>
          <h3>아이디 찾기</h3>
          {findResult === '' && (
            <div className='beforeFind'>
              <form>
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
          )}
          {findResult === 'fail' && (
            <div className='afterFind'>
              <img src='/image/findaccount.png' alt='' />
              <p>
                고객님께서 입력하신 정보가
                <br />
                정확한지 확인 후 다시 시도해주세요
              </p>
              <button
                type='button'
                onClick={() => this.setState({ findResult: '' })}
              >
                아이디 다시 찾기
              </button>
            </div>
          )}
          {findResult === 'success' && (
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
      </div>
    );
  }
}
