import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import TopNav from './components/Nav/TopNav';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';
import Main from './pages/Main/Main';
import Cart from './pages/Cart/Cart';
import Login from './pages/User/Login/Login';
import FindAccount from './pages/User/FindAccount/FindAccount';
import FindPw from './pages/User/FindPw/FindPw';
import SignUp from './pages/User/SignUp/SignUp';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <TopNav />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/detail/:id' component={Detail} />
            <Route exact path='/cart' component={Cart}></Route>
            <Route exact path='/findaccount' component={FindAccount} />
            <Route exact path='/findpw' component={FindPw} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

export default Routes;
