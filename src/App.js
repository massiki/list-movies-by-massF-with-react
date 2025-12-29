import { useEffect, useState } from 'react';
import './App.css';
import { getMoviewList } from './api.js'
import Cart from './components/Card.js';

function App() {
  const [moviesList, setMoviesList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getMoviewList().then((result) => {
      setMoviesList(result)
    })
  }, [])

  const AllMoviesList = () => {
    return moviesList.map((movie, index) => {
      return (
        <Cart
          id={index}
          data={movie}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
        />
      )
    })
  }

  const searchMovie = (query) => {
    setSearchQuery(query);
    if (!query) {
      getMoviewList().then((result) => {
        setMoviesList(result);
      });
      return;
    }

    getMoviewList().then((result) => {
      const filtered = result.filter(
        (movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMoviesList(filtered);
    });
  }

  return (
    <>
      <header>
        <h1>Movies Favorite by MassF</h1>
        <p>Explore popular movies from around the world</p>
      </header>
      <div className="search-box">
        <input onChange={(e) => searchMovie(e.target.value)} type="text" placeholder="Search movie..." autoFocus />
      </div>
      <section className="movie-container">
        <AllMoviesList />
      </section>
      <footer>
        © 2025 Fikri Amrullah. Made with ❤️ and code.
      </footer>
    </>
  );
}

export default App;
