import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopNav from './components/Nav/TopNav';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import Cart from './pages/Cart/Cart';
import FindAccount from './pages/FindAccount/FindAccount';
import FindPw from './pages/FindPw/FindPw';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route component={TopNav} />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/detail' component={Detail} />
          <Route exact path='/cart' component={Cart}></Route>
          <Route exact path='/findaccount' component={FindAccount} />
          <Route exact path='/findpw' component={FindPw} />
        </Switch>
        <Route component={Footer} />
      </Router>
    );
  }
}

export default Routes;
