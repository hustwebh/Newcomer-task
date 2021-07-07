import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from '../../component/mobile/header/mobile_header';
import MobileFooter from '../../component/mobile/footer/mobile_footer';
import Comment from '../../component/common/common_comment';

export default class MobileNewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        };
    }

    componentDidMount() {
        let fetchOption = {
            method: 'GET'
        };
        fetch("http://10.19.128.38:8080/news?uniquekey=" + this.props.params.uniquekey, fetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
            });
    }

    render() {
        return (

            <div>
                <MobileHeader/>
                <Row style={{marginTop:'1em'}}>
                    <Col span={1}/>
                    <Col span={22}>
                        <h1>{this.state.newsItem.title}</h1>
                        <div>{this.state.newsItem.description}</div>
                        <Comment uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={1}/>
                </Row>
                <MobileFooter/>
            </div>

        );
    }
}