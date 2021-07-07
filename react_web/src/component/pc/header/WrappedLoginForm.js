import React from 'react';
import { Icon, Form, Input, Button, Checkbox,message} from 'antd';
import './pc_header.css'
//登录表单组件
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasUser: '' };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    }

    //motal框中的处理登录提交表单
    handleLoginSubmit(e) {
        //页面开始向API进行提交数据
        //阻止submit事件的默认行为
        e.preventDefault();
        this.props.form.validateFields((err, formData) => {
            if (!err) {
                let myFetchOptions = {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers:{
                        "Content-Type":"application/json;charset=utf-8",
                    }
                };
                const url = "http://10.19.128.38:8080";
                console.log(JSON.stringify(formData))
                fetch(url+"/sign_in", myFetchOptions)
                    .then(response => response.json())
                    .then(json => {
                        if (json) {
                            message.success("登录成功");
                            console.log(json);
                            let userLogin = { name: json.name, userId: json.token };
                            this.props.login(userLogin);
                            //设置模态框消失
                            this.props.setModalVisible(false);
                        }
                        else {
                            //如果json为null，表示用户名密码不存在
                            this.setState({ hasUser: '用户名或密码错误' });
                        }

                    });


            }
        });
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleLoginSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: 'Please input your username!'
                        }],
                    })(
                        <Input prefix={<Icon type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            message: 'Please input your Password!'
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住该用户</Checkbox>
                    )}
                    <span>{this.state.hasUser}</span>
                    <Button htmlType="submit"
                        className="login-form-button">
                        登 录
                    </Button>

                </Form.Item>
            </Form>
        );
    }

}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;