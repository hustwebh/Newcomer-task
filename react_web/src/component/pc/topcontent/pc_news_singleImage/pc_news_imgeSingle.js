import React from 'react';
import ImageSingleComponent from './imageSingle_component'

 export default class PCNewsImageSingle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    //页面渲染之前
    componentDidMount() {
        console.log(this.props)
        let fetchOption = {method: 'GET'};
        let url = "http://10.19.128.38:8080/news";
        fetch(url+"?type=" + this.props.type + "&count=" + this.props.count, fetchOption)
        .then(response => response.json())
        .then(json => {
            alert(json);
            this.setState({news: json})
        });
    }

    render(){
        const news=this.state.news;
        const newsList=news.length?
          <ImageSingleComponent news={news} ImageWidth={this.props.ImageWidth} width={this.props.width} title={this.props.title}/>
            :'正在加载';

        return(
            <div >
                {newsList}
            </div>
        );
    }
}