import React from 'react';
import ImageNewsComponent from './image_news_component';

export default class PCNewsImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    componentDidMount() {
        let fetchOption = {method: 'GET'};
        let url = "http://10.19.128.38:8080/news";
        fetch(url +"?type=" + this.props.type + "&count=" + this.props.count, fetchOption)
        .then(response => response.json())
        .then(json => this.setState({news: json}));
    }

    render() {
        const news = this.state.news;

        let newsImage = news.length ?
            <ImageNewsComponent news={news} imageWidth={this.props.imageWidth} cartTitle={this.props.cartTitle} justifyContent={this.props.justifyContent}/>
            : '正在加载';

        return (

            <div>{newsImage}</div>
        );
    }
}