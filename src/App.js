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
    BooksAPI.getAll().then((bookList) => {
      this.setState({ bookList })
    })
  }

  render() {
    return (
      <div className="app">
        <MainPage
          bookList={this.state.bookList}
        />
      </div>
    );
  }
}

export default BooksApp;
