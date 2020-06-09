// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  NavLink,
  Route,
  useHistory,
} from 'react-router-dom';
import { pool } from './mysql_pool';

//   CREATE TABLE Shows (
//     id INT NOT NULL AUTO_INCREMENT,
//     title TEXT,
//     description TEXT,
//     PRIMARY KEY(id)
// );

// CREATE TABLE ShowRatings (
//     id INT NOT NULL AUTO_INCREMENT,
//     rating INT NOT NULL,
//     showId INT NOT NULL,
//     PRIMARY KEY(id)
// );

class Show {
  id: number = 0;
  title: string = '';
  description: string = '';
}

class Rating {
  id: number = 0;
  rating: number = 0;
  showId: number = 0;
}

class ShowService {
  getAllShows(): Promise<Show[]> {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Shows', (error: ?Error, results: Show[]) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  addShow(show: Show): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO Shows (title, description) VALUES (?,?)',
        [show.title, show.description],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  deleteShow(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM Shows WHERE id = ?', [id], (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  getAllRatings(): Promise<Rating[]> {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM ShowRatings',
        (error: ?Error, results: Rating[]) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  addRating(rating: Rating): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO ShowRatings (showId, rating) values (?, ?)',
        [rating.showId, rating.rating],
        (error, results) => {
          if (error) return console.error(error);

          resolve(results);
        }
      );
    });
  }

  deleteShowRatings(showId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM ShowRatings WHERE showId = ?',
        [showId],
        (error, results) => {
          if (error) return console.error(error);

          resolve(results);
        }
      );
    });
  }
}
const showService = new ShowService();

const StoreContext = React.createContext();

function Store(props) {
  const history = useHistory();

  const [shows, setShows] = React.useState(null);
  const [ratings, setRatings] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showsUpdated, setShowsUpdated] = React.useState(true);
  const [ratingsUpdated, setRatingsUpdated] = React.useState(true);

  React.useEffect(() => {
    if (!showsUpdated) return;
    showService
      .getAllShows()
      .then((results) => {
        setShows(results);
      })
      .catch((e: Error) => handleError((e.message: string)));
    setShowsUpdated(false);
  }, [showsUpdated]);

  React.useEffect(() => {
    if (!ratingsUpdated) return;
    showService
      .getAllRatings()
      .then((results) => {
        setRatings(results);
      })
      .catch((e: Error) => handleError((e.message: string)));
    setRatingsUpdated(false);
  }, [ratingsUpdated]);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const addShow = (show: Show) => {
    showService
      .addShow((show: Show))
      .then(() => {
        navigateToRoot();
      })
      .catch((e: Error) => handleError((e.message: string)));
    setShowsUpdated(true);
  };

  const addRating = (rating: Rating) => {
    showService
      .addRating(rating)
      .catch((e: Error) => handleError((e.message: string)));
    setRatingsUpdated(true);
  };

  const deleteShow = (show: Show) => {
    showService
      .deleteShowRatings(show.id)
      .then(() => showService.deleteShow(show.id))
      .catch((e: Error) => handleError((e.message: string)));
    setShowsUpdated(true);
    setRatingsUpdated(true);
  };

  const navigateToRoot = () => {
    history.push('/');
  };

  return (
    <>
      <StoreContext.Provider
        value={{
          shows,
          ratings,
          errorMessage,
          handleError,
          addShow,
          addRating,
          deleteShow,
        }}
      >
        {props.children}
      </StoreContext.Provider>
    </>
  );
}

function AddShow() {
  const store = React.useContext<Object>(StoreContext);
  const [show, setShow] = React.useState<Show>(new Show());

  const handleChange = (e) => {
    setShow(
      ({ ...show, [e.currentTarget.name]: e.currentTarget.value }: Object)
    );
  };

  const handleAddShow = () => {
    if (!show.title || !show.description) {
      store.handleError('Add title and description');
      return;
    }
    store.addShow(show);
  };

  if (!store) return null;
  return (
    <>
      <form>
        Title
        <input name="title" type="text" required onChange={handleChange} />
        <br />
        Description
        <br />
        <textarea
          name="description"
          type="text"
          required
          onChange={handleChange}
          rows="8"
          cols="80"
        />
      </form>
      <button onClick={() => handleAddShow()}>Add show</button>

      <NavLink to={'/'}>Cancel</NavLink>
      {store.errorMessage}
    </>
  );
}

function DeleteShow() {
  const store = React.useContext<Object>(StoreContext);

  if (!store.shows) return null;
  return (
    <>
      {store.shows.map((show) => (
        <div key={show.id}>
          <button onClick={() => store.deleteShow(show)}>delete</button>
          id: {show.id} title: {show.title}
        </div>
      ))}
      <NavLink to={'/'}>Cancel</NavLink>
      {store.errorMessage}
    </>
  );
}

function DisplayShow(props) {
  const store = React.useContext<Object>(StoreContext);
  let rating = new Rating();
  const show = props.show;
  const showRatings = store.ratings.filter((e) => e.showId === show.id);

  const handleRating = (value) => {
    rating = { ...rating, showId: show.id, rating: value };
    store.addRating(rating);
  };

  return (
    <>
      <div key={show.id}>
        <h3>{show.title}</h3>
        <div>{show.description}</div>
        Rating:{' '}
        {Number(
          (
            showRatings.reduce((sum, e) => sum + e.rating, 0) /
            showRatings.length
          ).toFixed(2)
        ) || 'unrated'}
        <br />
        Votes: {showRatings.length}
        <br />
        Rate:
        <button onClick={() => handleRating(1)}>1</button>
        <button onClick={() => handleRating(2)}>2</button>
        <button onClick={() => handleRating(3)}>3</button>
        <button onClick={() => handleRating(4)}>4</button>
        <button onClick={() => handleRating(5)}>5</button>
      </div>
    </>
  );
}

function DisplayAllShows() {
  const store = React.useContext<Object>(StoreContext);
  const [search, setSearch] = React.useState('');

  const handleSearch = (value) => {
    setSearch(value);
  };

  if (!store.shows || !store.ratings) return null;
  return (
    <>
      Manage shows: <NavLink to={'/shows/add'}>add</NavLink>{' '}
      <NavLink to={'/shows/delete'}>delete</NavLink>
      <br />
      <h2>Shows</h2>
      <input
        value={search}
        placeholder="search"
        onChange={(e) => handleSearch(e.currentTarget.value)}
      ></input>
      {store.shows
        .filter((show) =>
          show.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((show) => (
          <div key={show.id}>
            <DisplayShow show={show} />
          </div>
        ))}
    </>
  );
}

let root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <Router>
      <Store>
        <Route exact path="/">
          <DisplayAllShows />
        </Route>
        <Route path="/shows/add">
          <AddShow />
        </Route>
        <Route path="/shows/delete">
          <DeleteShow />
        </Route>
      </Store>
    </Router>,
    root
  );
