import React from 'react';
import { Icon, message, Form, Input, Button } from 'antd';

//注册表单组件
class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confirmDirty: false };
        this.handleRegisterSubmit=this.handleRegisterSubmit.bind(this);
    }
    
    //处理注册提交表单
    handleRegisterSubmit(e) {
        //页面开始向API进行提交数据
        //阻止submit事件的默认行为

        e.preventDefault();

        this.props.form.validateFields((err, formData) => {
            if (!err) {
                let myFetchOptions = {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    credentials: "same-origin",
                };
                //发起注册数据请求
                const url = "http://10.19.128.38:8080";
                fetch(url+"/sign_up", myFetchOptions)
                    .then(response => response.json())
                    .then(json => {
                        if (json) {
                            message.success("注册成功");
                            console.log(json)
                            //设置模态框消失
                            this.props.setModalVisible(false);
                        }

                    });


            }
        })
    }

    //注册验证确认密码框输入的密码两次是否一样
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    //注册检验密码
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirmPassword'], { force: true });
        }
        callback();
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleRegisterSubmit}>
                <Form.Item lable="账户">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入您的账户!' }],
                    })
                        (<Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='请输入您的账户' />)}
                </Form.Item>

                <Form.Item lable="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码' }, {
                            validator: this.checkConfirm.bind(this),
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='password' placeholder='请输入您的密码' />)}
                </Form.Item>

                <Form.Item lable="确认密码">
                    {getFieldDecorator('r_confirmPassword', {
                        rules: [{
                            required: true, message: '请确认您的密码!',
                        }, {
                            validator: this.checkPassword.bind(this),
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='password' placeholder='请再次输入您的密码' />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit'>注册</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;