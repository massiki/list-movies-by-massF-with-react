import { useEffect, useState } from 'react';
import './App.css';
import { getMoviewList } from './api.js'

function App() {
  const [moviesList, setMoviesList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getMoviewList().then((result) => {
      setMoviesList(result)
    })
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-EN', options);
  };

  const AllMoviesList = () => {
    return moviesList.map((data, index) => {
      return (
        <div key={index} className="movie-card">
          <img
            src={`${process.env.REACT_APP_PATH_URL}${data.poster_path}`}
            alt={data.title}
          />
          <div className="movie-content">
            <h3>{data.title}</h3>
            <div className="movie-info">
              <span>{formatDate(data.release_date)}</span>
              <span>⭐ {data.vote_average}</span>
            </div>
          </div>
        </div>
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
