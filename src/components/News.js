import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    
    const capatalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    

    const updateNews = async() =>{
        props.setProgress(10);
        // const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4324c221eb874be59977da40b5dd7a33&page=${page}1&pageSize=${props.pageSize}`;
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data= await fetch(url);
        props.setProgress(30);
        let parseData=await data.json()
        props.setProgress(70);
        console.log(parseData);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capatalizeFirstLetter(props.category)} - NewsPoint`;
        updateNews();
        //eslint-disable-next-line
    }, [])

    // const handlePrevClick = async ()=>{
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async ()=>{
    //     setPage(page+1)
    //     updateNews();
    //     }

    const fetchMoreData = async () => {
            const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
            setPage(page+1)
            //setState({loading: true})
            let data= await fetch(url);
            let parseData=await data.json();
            console.log(parseData);
            setArticles(articles.concat(parseData.articles));
            setTotalResults(parseData.totalResults);

    }
    

    return (
        // <div className="container my-3">
        <>
            <h1 className="text-center" style={{margin: '90px 0px 40px 0px'}}>NewsPoint - Top Headliners from {capatalizeFirstLetter(props.category)} Category</h1>
            {loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner></Spinner>}>

        <div className="container">
            <div className="row">
                {/* {!loading && articles.map((element)=>{ */}
                {articles.map((element)=>{
                return   <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,100):""} urlToImage={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
                        </div>
                })}        
            </div>
        </div>
        </InfiniteScroll>    
            {/* <div className="container d-flex justify-content-between">
                <button disabled={page<=1} type="button" className="btn btn-success" onClick={handlePrevClick}>&#8592; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults/20)}type="button" className="btn btn-success" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
        {/* </div> */}
        </>
    )
  }

  News.defaultProps = {
    country:'in',
    pageSize: 8,
    category: 'general',
}
  News.propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
}

export default News