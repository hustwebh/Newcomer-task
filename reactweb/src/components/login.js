
import React, { Component } from "react";
import { Formik, Field, Form } from "formik";

export default class Login extends Component {
    render() {
        return (
            <div>
                <h3>登录</h3>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async values => {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <label>邮箱地址</label>
                            <Field className="form-control" name="email" type="text" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <Field className="form-control" name="password" type="password" placeholder="Enter password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">登录</button>
                        <p className="forgot-password text-right">
                            <a href="/sign-up">新用户注册</a>
                        </p>
                    </Form>
                </Formik>
            </div>
        );
    }
}