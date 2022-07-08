import React from 'react'

 const NewsItem = (props)=> {
    let {title,description, urlToImage, newsUrl, author, date, source} = props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{display: 'flex', justifyContent:'flex-end', position: 'absolute', right:'0'}}>
            <span className="badge rounded-pill bg-danger" >{source}</span>
        </div>
            <img src={!urlToImage?"https://images.moneycontrol.com/static-mcnews/2022/07/stocks_market-stock_stock-770x433.jpg":urlToImage} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author? "Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary ">Read More</a>
                </div>
        </div>
      </div>
    )
}

export default NewsItem