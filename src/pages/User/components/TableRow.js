import { Component } from 'react';
import TextInput from './TextInput';
import USER_INFO from './UserInfo';
import './TableRow.scss';

export default class TableRow extends Component {
  render() {
    const { input, onChange, onClick } = this.props;
    const userInfoObj = USER_INFO[input];
    const { text, required, dupCheck, auth } = userInfoObj;
    return (
      <tr className='TableRow'>
        <th>
          {text}
          {required && <span className='asterisk'>*</span>}
        </th>
        <td>
          <TextInput input={input} onChange={onChange} />
          {(dupCheck || auth) && (
            <button
              type='button'
              className='btnAccountDup'
              onClick={onClick ? onClick : null}
            >
              {auth ? `인증` : `중복확인`}
            </button>
          )}
        </td>
      </tr>
    );
  }
}
