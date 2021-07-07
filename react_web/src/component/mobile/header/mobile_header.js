import React from 'react';
import Logo from '../../../static/images/logo.png';
import {Icon} from 'antd';
import {Link} from 'react-router';
import LoginRegisterModal from '../../pc/header/loginRegisterModal';
import './mobile_header.css'

export default class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'top',
            hasLogined: false,
            modalVisable: false,
            name: '',
        };
    }

    setModalVisible(value) {
        this.setState({modalVisable: value});
    }

    handleClick() {
        this.setModalVisible(true);
    }

    //组件加载之前，判断其localstorage是否有值
    componentWillMount(){
        //表示存在id
        if (localStorage.userId&&localStorage.userId!='') {
                this.state.hasLogined = true;
                this.state.name = localStorage.name;
                this.state.userId = localStorage.userId;
        }
    };

    //点击登录按钮
    login(userLogin){
        this.setState({name:userLogin.name,hasLogined:true,userId:userLogin.userId});
        localStorage.name=userLogin.name;
        localStorage.userId=userLogin.userId;
    }

    logout() {
        localStorage.name = '';
        localStorage.userId = '';
        this.setState({hasLogined: false, name: '', userId: ''});
    };

    render() {
        const userShow = this.state.hasLogined ?
            <Icon type='inbox' onClick={this.logout.bind(this)}/> : <Icon type='setting' onClick={this.handleClick.bind(this)}/>;
        return (
            <div id="mobile">
                <header>
                    <Link to='/'><img src={Logo} alt="mobile_logo"/></Link>
                    <span>新闻头条</span>
                    {userShow}
                </header>
                <LoginRegisterModal setModalVisible={this.setModalVisible.bind(this)} login={this.login.bind(this)}
                                    visible={this.state.modalVisable}/>
            </div>
        );
    }
}





