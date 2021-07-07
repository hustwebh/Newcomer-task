import React from 'react';
import { Row, Col,Card} from 'antd';
import FormComment from './FormComment';
import { message} from 'antd';


 export default class Comment extends React.Component {
    constructor() {
        super();
        this.state = {comments: ''};
    }

    componentDidMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://10.19.128.38:8080/getcomment?ID=" + this.props.uniquekey, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({comments: json});
        })
    };


    handleSubmit(data) {

        let myFetchOptions = {
            method: 'GET'
        };
        //如果用户登录了
        if(localStorage.userId!=null){
            //提交了之后发送请求添加评论
            console.log(localStorage.name)
            fetch("http://10.19.128.38:8080/comment?name=" + localStorage.name + "&ID=" + this.props.uniquekey + "&Comment=" +data , myFetchOptions)
                .then(response => response.json())
                .then(json => {
                    //请求成功之后，重新加载页面
                    this.componentDidMount();
                })
        }
        else
        {
            message.info('请先登录');
            return;
        }

    }

    render() {
        const comments = this.state.comments;
        const commnetList = comments.length?
            comments.map((comment,index)=>(
                <Card key={index} title={comment.name} extra={<a href="#">发布于 {comment.datetime}</a>}>
                    <p>{comment.Comment}</p>
                </Card>
            )):'';


        return (
            <Row>
                <Col span={24}>
                    {commnetList}
                     <FormComment submitFn={this.handleSubmit.bind(this)}/>
                </Col>
            </Row>
        );
    }

}

