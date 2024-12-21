import React, { useEffect, useState } from 'react';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/news')
            .then(response => response.json())
            .then(data => setArticles(data.articles))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <div>
            <h1>Latest News</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;