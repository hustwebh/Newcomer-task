import React from 'react';
import {Link} from 'react-router';
import {Card} from 'antd';
import './imageSingle_component.css';
export default class ImageSingleNewComponent extends React.Component{
    render(){
        const news=this.props.news;
        console.log(this.props)
        const newsList=news.map((newsItem,index)=>(
            <Link to={`details/${newsItem.ID}`} target='_blank' key={index}>
                <section  className='imageSingle_sec' style={{width:this.props.width}}>
                    <div className='imageSingle_left' style={{width:this.props.ImageWidth}}>
                        <img style={{width:this.props.ImageWidth}} src={newsItem.picurl} alt={newsItem.title}/>
                    </div>
                    <div className='imageSingle_right'>
                        <p>{newsItem.title}</p>
                        <span className='realType' >{newsItem.realtype}</span>
                        <span>{newsItem.source}</span>
                    </div>
                </section>
            </Link>
        ));

        return(
            <Card title={this.props.title} className='imageSingleCard'>
                {newsList}
            </Card>

        );
    }
}