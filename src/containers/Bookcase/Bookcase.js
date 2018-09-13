import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../store/actions/books';
import WeDeploy from 'wedeploy';

import { BookshelfSorter, Shelf, Spinner } from 'components';

import './Bookcase.css';

class Bookcase extends Component {
  state = {
    currentMember: {},
    currentUser: {},
    members: [],
    ratings: [],
  };

  componentDidMount() {
    this.props.onGetBooks(this.props.srtVal);

    const data = WeDeploy.data(process.env.REACT_APP_DATABASE);

    const members = data.get('members');
    const ratings = data.get('ratings');

    Promise.all([members, ratings]).then(([members, ratings]) => {
      this.setState({
        members,
        ratings,
      });
    });
  }

  render() {
    let shelf = this.props.error ? (
      <p>
        We're having some trouble loading the books. Try refreshing the page!
      </p>
    ) : (
      <Spinner />
    );

    if (this.props.bks) {
      shelf = (
        <Shelf
          books={this.props.bks}
          currentMember={this.state.currentMember}
          currentUser={this.state.currentUser}
          members={this.state.members}
          ratings={this.state.ratings}
        />
      );
    }
    return (
      <div className="Bookcase">
        <div className="control-box">
          <BookshelfSorter
            books={this.props.bks}
            onSorterChange={this.props.onSorterChange}
            value={this.props.srtVal}
          />

          {/* <Navbar
            currentMember={this.state.currentMember}
            currentUser={this.state.currentUser}
            email={this.state.signInFormEmail}
            handleAddBook={this.handleAddBook}
            handleAddBookModalClose={this.handleAddBookModalClose}
            handleAddBookModalOpen={this.handleAddBookModalOpen}
            handleSignIn={this.handleSignIn}
            handleSignInModalClose={this.handleSignInModalClose}
            handleSignInModalOpen={this.handleSignInModalOpen}
            handleSignOut={this.handleSignOut}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onTitleChange={this.onTitleChange}
            password={this.state.signInFormPassword}
            showModalAddBook={this.state.showModalAddBook}
            showModalSignIn={this.state.showModalSignIn}
          /> */}
        </div>

        {shelf}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bks: state.books,
    srtVal: state.sortValue,
    // curMember: state.currentMember,
    // curUser: state.currentUser,
    // members: state.members,
    // ratings: state.ratings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBooks: sortValue => dispatch(booksActions.getBooks(sortValue)),
    onSorterChange: (books, sortValue) =>
      dispatch(booksActions.sortBooks(books, sortValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookcase);
