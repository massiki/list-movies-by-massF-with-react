const Cart = (props) => {
  const pathUrl = process.env.REACT_APP_PATH_URL
  const { id, title, poster_path, release_date, vote_average } = props

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-EN', options);
  };

  return (
    <>
      <div key={id} className="movie-card">
        <img
          src={`${pathUrl}${poster_path}`}
          alt={title}
        />
        <div className="movie-content">
          <h3>{title}</h3>
          <div className="movie-info">
            <span>{formatDate(release_date)}</span>
            <span>⭐ {vote_average}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart