import React from "react";
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI'
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
    return (
      <div className="app">
        {/*<MainPage
          bookList={this.state.bookList}
          changeShelf={this.changeShelf}
        />*/}
        <SearchPage />
      </div>
    );
  }
}

export default BooksApp;
