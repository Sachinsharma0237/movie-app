import React, { useEffect, useState } from 'react';
import Movie from './Components/Movie';
import AddFavourite from './Components/AddFavourite';
//04c35731a5ee918f014970082a0088b1
//0145f93fa4225b4ffcfcf44ce5ed7ac7
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const[ movies, setMovies ] = useState([]);
  const[favourites, setFavourites] = useState([]);
  const[ searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
      getMovies(FEATURED_API);
    }, [])


  const getMovies=(API)=>{
    fetch(API).then( res => res.json())
    .then( data=>{
      console.log(data);
      setMovies(data.results);
    })
  }

  const handleOnSubmit =(e)=>{
    e.preventDefault();

    if(searchTerm){
        getMovies(SEARCH_API+searchTerm)
        setSearchTerm("");
    }
    
  };

  const handleOnChange =(e)=>{
    setSearchTerm(e.target.value);

  };

  const addFavouriteMovie = (movie) =>{
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
  }


  return (
    <div className="app">
    <header>
    <form onSubmit={handleOnSubmit}>
        <input 
        className="search" 
        type="search" 
        placeholder="search..." 
        value={searchTerm}
        onChange={handleOnChange}
        />
    </form>
    </header>
    <div className="movie-container">
        { movies != null ? movies.map( (movie)=>
             <Movie key={movie.id} {...movie} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourite} ></Movie>
        )
        :
        <h3>No Result Found...</h3>
      }
    </div>
    </div>
  );
}

export default App;
