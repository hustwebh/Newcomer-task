import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import './image_news_component.css';

export default class ImageNewsComponent extends React.Component {
    render(){
        const news=this.props.news;
        const newsList=news.map((newsItem, index) => (
            <div key={index} className='image_news_item' style={{width:this.props.imageWidth}}>
                <Link to={`details/${newsItem.ID}`} target='_blank'>
                    <img alt="newsItem.title" src={newsItem.picurl} width={this.props.imageWidth}/>
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.source}</p>
                </Link>
            </div>
        ));

        return(
            <Card className='image_card' title={this.props.title} bordered={true} style={{width: this.props.width,marginTop:'10px'}}>
                <div className='image_news_container' style={{width: this.props.width,justifyContent:this.props.justifyContent}}>
                    {newsList}
                </div>
            </Card>

        );
    }
}