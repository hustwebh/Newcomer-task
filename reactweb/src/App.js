// import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Login from "./components/login";
// import SignUp from "./components/signup";
// import Home from "./components/home";

// function App() {
//   return (<Router>
//     <div className="App">
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//           <Link className="navbar-brand" to={"/sign-in"}><strong>welcome to our website</strong></Link>
//           {/* <Link className="navbar-brand" to={"/home"}>首页</Link> */}
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-in"}>登录</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-up"}>注册</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           <Switch>
//             <Route exact path='/' component={Login} />
//             <Route path="/sign-in" component={Login} />
//             <Route path="/sign-up" component={SignUp} />
//             <Route path="/home" component={Home} />
//           </Switch>
//         </div>
//       </div>
//     </div></Router>
//   );
// }

// export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory} from 'react-router';
import PCIndex from './components/pc_index';
import PCUserCenter from './components/pc_usercenter';
import PCNewsDetails from './components/pc_news_details';
import MobileIndex from './components/mobile_index';
import MobileUserCenter from './components/mobile_usercenter';
import MobileNewsDetails from './components/mobile_news_details';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}/>
            <Route path='/usercenter' component={PCUserCenter}/>
            <Route path='/details/:uniquekey' component={PCNewsDetails}/>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={MobileIndex}/>
            <Route path='/usercenter' component={MobileUserCenter}/>
            <Route path='/details/:uniquekey' component={MobileNewsDetails}/>
          </Router>
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(
  <Root/>, document.getElementById('root'))