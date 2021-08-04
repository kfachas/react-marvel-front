const Favorites = ({ favory, userToken }) => {
  return userToken ? (
    <main className="favorites">
      <ul>
        {favory.map((elem) => {
          return (
            <li key={elem._id}>
              {elem.title || elem.name}
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt={elem.title}
              />
            </li>
          );
        })}
        Vous n'avez pas encore de favori !
      </ul>
    </main>
  ) : (
    <span>Vous devez être connecter pour pouvoir mettre en favori.</span>
  );
};

export default Favorites;
