import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory} from 'react-router';
import { queryCurrentUser } from '../queries/Queries';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.logout({
      refetchQueries: [{ query: queryCurrentUser}]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if(loading) return null;

    if(user) {
      return (
      <li>
        <a onClick={this.onLogoutClick.bind(this)}>Log Out</a>
      </li>
    );
    }
    else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default compose(graphql(queryCurrentUser), graphql(mutation, { name: "logout"}))(Header);