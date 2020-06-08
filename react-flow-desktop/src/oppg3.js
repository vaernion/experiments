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

  getShow(title: string): Promise<Show> {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM Shows WHERE title = ?',
        [title],
        (error: ?Error, results: Show[]) => {
          if (error) reject(error);
          resolve(results[0]);
        }
      );
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
      .then(() => {})
      .catch((e: Error) => handleError((e.message: string)));
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
        }}
      >
        {props.children}
      </StoreContext.Provider>
    </>
  );
}

function DisplayShow(props) {
  const store = React.useContext(StoreContext);
  const [rating, setRating] = React.useState<Rating>(new Rating());
  const show = props.show;

  const handleChange = (e) => {
    setRating(
      ({
        ...rating,
        [e.currentTarget.name]: e.currentTarget.value,
        showId: show.id,
      }: Object)
    );
  };
  return (
    <>
      <div key={show.id}>
        <h1> {show.title}</h1>
        <div>{show.description}</div>
        Average rating:{' '}
        {store.ratings
          .filter((e) => e.showId === show.id)
          .reduce((sum, e) => sum + e.rating, 0) /
          store.ratings.filter((e) => e.showId === show.id).length}
        Your rating:
        <input name="rating" type="number" required onChange={handleChange} />
        <button onClick={() => store.addRating(rating)}>Submit</button>
      </div>
    </>
  );
}

function AddShow(props) {
  const store = React.useContext(StoreContext);
  const [show, setShow] = React.useState<Show>(new Show());

  const handleChange = (e) => {
    setShow(
      ({ ...show, [e.currentTarget.name]: e.currentTarget.value }: Object)
    );
  };

  if (!store) return null;
  return (
    <>
      <form>
        Title
        <input name="title" type="text" required onChange={handleChange} />
        Description
        <input
          name="description"
          type="text"
          required
          onChange={handleChange}
        />
      </form>
      <button onClick={() => store.addShow(show)}>Add show</button>

      <NavLink to={'/'}>Cancel</NavLink>
    </>
  );
}

function DisplayAllShows(props) {
  const store = React.useContext(StoreContext);

  if (!store.shows || !store.ratings) return null;
  return (
    <>
      {store.shows.map((show) => (
        <div key={show.id}>
          <DisplayShow show={show} />
        </div>
      ))}
      <NavLink to={'/shows/add'}>Add show</NavLink>
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
      </Store>
    </Router>,
    root
  );
