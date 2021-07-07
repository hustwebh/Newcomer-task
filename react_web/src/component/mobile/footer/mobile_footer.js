import React from 'react';
import {Row,Col} from 'antd';


export default class MobileFooter extends React.Component{
    render(){
        return (
            <footer>
                <Row>
                    <Col span={2}/>
                    <Col span={20} style={{ textAlign:'center'}}>
                        &copy;&nbsp;2021 新闻头条
                    </Col>
                    <Col span={2}/>
                </Row>
            </footer>
        );
    }
}