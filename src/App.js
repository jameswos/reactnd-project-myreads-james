import React from "react";
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import "./App.css";

class BooksApp extends React.Component {
  state = {
    bookList: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((book) => {
      this.setState({ bookList: book })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((book) => {
      this.setState({ bookList: book })
    })
  }

  render() {

    const { bookList } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MainPage
            bookList={bookList}
            changeShelf={this.changeShelf}
          />
        )} />

        <Route path="/search" render={() => (
          <SearchPage
            changeShelf={this.changeShelf}
            bookList={bookList}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
