import React, { Component } from "react";
import { Formik, Field, Form } from "formik";


export default class SignUp extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         password: '',
    //         confirmPassword: '',
    //     }
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange1 = this.handleChange1.bind(this);
    // this.handleChange2 = this.handleChange2.bind(this);
    // }
    // handleChange1(event) {
    //     console.log(this.state)
    //     this.setState({password: event.target.value});
    // }
    // handleChange2(event) {
    //     console.log(this.state)
    //     this.setState({confirmPassword: event.target.value});
    // }
    // handleSubmit(){
    //     if(this.state.password !== this.state.confirmPassword){
    //         console.log(123)
    //         return false; // The form won't submit
    //     }
    //     else return true; // The form will submit
    // }
    render() {
        return (
            <div>
                <h3>注册</h3>
                <Formik
                    initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                    onSubmit={async values => {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        alert(JSON.stringify(values, null, 2));
                        // console.log(values)
                        if (values.password !== values.confirmPassword) {
                            alert("两次密码输入不一致!");
                            return false;
                        }
                        else {
                            alert("注册成功");
                            localStorage.setItem(values.name, JSON.stringify(values, null, 2));
                            fetch("192.168.147.51:8080/sign-up", {
                                method: 'POST',
                                body: JSON.stringify(values, null, 2),
                                credentials: "same-origin",
                            }).then(resolve => resolve.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => console.log('Success:', response));
                            return true;
                        }
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <label>用户名</label>
                            <Field className="form-control" name="name" type="text" />
                        </div>
                        <div className="form-group">
                            <label>邮箱地址</label>
                            <Field className="form-control" name="email" type="text" />
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <Field className="form-control" name="password" type="password" />
                        </div>
                        <div className="form-group">
                            <label>确认密码</label>
                            <Field className="form-control" name="confirmPassword" type="password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">注册</button>
                        <p className="forgot-password text-right">
                            已有帐号 <a href="/sign-in">登录</a>
                        </p>
                    </Form>
                </Formik>
            </div>
        );
    }

}