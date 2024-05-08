import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [author, setAuthor] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/quote')
            .then(response => {
                setQuote(response.data);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/api/search?author=${author}`)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Error searching for quotes:', error);
            });
    };

    return (
        <div className="container" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {quote && (
                        <>
                            <h2 className="text-center mt-5">{quote.quote}</h2>
                            <p className="text-center">- {quote.author}</p>
                        </>
                    )}
                    <form onSubmit={handleSearch} className="form-inline d-flex justify-content-center mt-3">
                        <div className="form-group mx-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                placeholder="Search for quotes by author"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                    <ul className="list-group mt-5">
                        {searchResults.map((quote, index) => (
                            <li key={index} className="list-group-item">
                                <blockquote className="blockquote"   >
                                    <p>{quote.quote}</p>
                                    <footer className="blockquote-footer">{quote.author}</footer>
                                </blockquote>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default Quote;