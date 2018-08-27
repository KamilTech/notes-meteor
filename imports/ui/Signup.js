import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        confirm: '',
        emailError: '',
        regExp: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        passLength: '',
        confirmNoMatch: ''
      }
    }

    componentWillMount() {
      if (Meteor.userId())
          this.props.history.replace('/dashboard');
    }

    onSubmit(e) {
      e.preventDefault();
      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();

      if (email && password) {
        Accounts.createUser({email, password}, (err) => {
          if (err) {
            this.setState({emailError: err.reason});
          } else {
            this.setState({emailError: ''});
          }
        });
      }
      return;
    }

    emailValidator(e) {
      this.setState({email: e.target.value});
      const value = e.target.value;

      if (value.length === 0) {
        this.setState({emailError: 'Email field is required'});
      } else if (!this.state.regExp.test(value)) {
        this.setState({emailError: 'Email must be valid'});
      } else {
        this.setState({ emailError: '' });
      }
    }

    passwordValidator(e) {
      this.setState({password: e.target.value});
      const password = e.target.value;

      if (password.length === 0) {
        this.setState({ passLength: 'Password field is required' });
      } else if (password.length < 6) {
        this.setState({ passLength: 'Password must be more than 6 characters long' });
      } else {
        this.setState({ passLength: '' });
      }
    }

    confirmValidator(e) {
      this.setState({confirm: e.target.value});
      const confirm = e.target.value;

      if(confirm !== this.refs.password.value.trim()) {
        this.setState({ confirmNoMatch: 'Passwords do not match' })
      } else {
        this.setState({ confirmNoMatch: '' });
      }
    }

    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1 className="boxed-view__title">Join</h1>

            <div className="boxed-view__error">
              <ul>
                {this.state.emailError ? <li>{this.state.emailError}</li> : undefined}
                {this.state.passLength ? <li>{this.state.passLength}</li> : undefined}
                {this.state.confirmNoMatch ? <li>{this.state.confirmNoMatch}</li> : undefined}
              </ul>
            </div>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input onChange={this.emailValidator.bind(this)} type="email" ref="email" name="email" placeholder="Email"></input>
              <input onChange={this.passwordValidator.bind(this)} type="password" ref="password" name="password" placeholder="Password"></input>
              <input onChange={this.confirmValidator.bind(this)} type="password" ref="confirm" name="confirm" placeholder="Confirm password"></input>
              <button disabled={!this.state.email || !this.state.password || !this.state.confirm || this.state.emailError || this.state.confirmNoMatch || this.state.passLength} className="button">Create Account</button>
            </form>

            <Link to="/login">Already have an acconut?</Link>
          </div>
        </div>
      )
    }
  }