import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Books from './Books';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.findBooks(query);
  }

  findBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    const { searchedBooks } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchedBooks.map(searchedBook => {
                let shelf = 'none';

                this.props.bookList.map(book => (
                  book.id === searchedBook.id ?
                  shelf = book.shelf :
                  ''
                ));

                return (
                  <li key={searchedBook.id}>
                    <Books
                      book={searchedBook}
                      changeShelf={this.props.changeShelf}
                      onShelf={shelf}
                    />
                  </li>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
