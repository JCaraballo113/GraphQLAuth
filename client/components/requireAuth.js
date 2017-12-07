import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import { queryCurrentUser } from '../queries/Queries';

export default (WrappedComponent) => {
class RequireAuth extends Component {
  componentWillUpdate(nextProps, nextState) {
    if(!nextProps.data.loading && !nextProps.data.user) {
      hashHistory.push('/login');
    }
  }

  render() {
    return (
      <WrappedComponent {...this.props} />
    );
  }
}

return graphql(queryCurrentUser)(RequireAuth);
};