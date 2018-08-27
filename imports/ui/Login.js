import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        emailError: '',
        regExp: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      }
    }

    componentWillMount() {
      if (Meteor.userId())
          this.props.history.replace('/links');
    }

    onSubmit(e) {
      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();

      Meteor.loginWithPassword({email}, password, (err) => {
        if (err) {
          this.setState({emailError: 'Invaild Email or password'});
        } else {
          this.setState({emailError: ''});
          this.props.history.replace('/dashboard');
        }
      });

      e.preventDefault();
    }

    emailValidator(e) {
      this.setState({email: e.target.value});
      let value = e.target.value;

      if (value.length === 0) {
        this.setState({emailError: 'Email field is required'});
      } else if (!this.state.regExp.test(value)) {
        this.setState({emailError: 'Email must be valid'});
      } else {
        this.setState({emailError: ''});
      }
    }

    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1 className="boxed-view__title">Login</h1>
            <div className="boxed-view__error">
              <ul>
                {this.state.emailError ? <li>{this.state.emailError}</li> : undefined}
              </ul>
            </div>

            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input className={this.state.emailIncorrect || this.state.emailLength ? 'error' : null} onChange={this.emailValidator.bind(this)} type="email" ref="email" name="email" placeholder="Email"></input>
              <input onChange={(e)=> { this.setState({ password: e.target.value }) }} type="password" ref="password" name="password" placeholder="Password"></input>
              <button disabled={!this.state.email || !this.state.password || this.state.emailIncorrect || this.state.emailLength} className="button">Login</button>
            </form>
            <Link to="/signup">Have an account?</Link>
          </div>
        </div>
      );
    }
  }