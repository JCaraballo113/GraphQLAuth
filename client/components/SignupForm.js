import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { hashHistory } from 'react-router';
import { AuthForm } from './AuthForm';
import mutation from '../mutations/Signup';
import { queryCurrentUser } from '../queries/Queries';

export class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  
  componentWillUpdate(nextProps, nextState) {
    if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: queryCurrentUser }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() { 
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}
 
export default compose(graphql(mutation), graphql(queryCurrentUser))(SignupForm);