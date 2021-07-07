import React from 'react';
import {Row, Col} from 'antd';
import PCNewsImageBlock from '../../component/pc/topcontent/pc_news_image/pc_news_imageblock';
import Comment from '../../component/common/common_comment';
import "./pc_news_detail.css"

export default class PCNewsDetail extends React.Component {
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
        fetch("http://10.19.128.38:8080/news?ID="+ this.props.params.uniquekey, fetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});

            });
    }

    render() {
        return (

            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={14}>
                        <h1 className="main_title">{this.state.newsItem.title}</h1>
                        <img className="main_pic" src={this.state.newsItem.picurl}/>
                        <div className="text" style={{marginTop: '30px'}} >
                            {this.state.newsItem.description}
                        </div>
                        <Comment uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={1}/>
                    <Col span={6}>
                        <PCNewsImageBlock imageWidth='150px' width='100%'  count={40} type='top' cartTitle='推荐'/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>

        );
    }
}