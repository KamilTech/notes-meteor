import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router'

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if (!Meteor.userId() && this.props.match.params.id) {
        this.props.history.replace('/login');
      };
    }

    componentWillMount() {
      if (Meteor.userId()) {
        Session.set('selectedNoteId', this.props.match.params.id);
      } else {
        if (this.props.match.params.id) {
          this.props.history.replace('/login');
        }
      }
    }

    componentWillReceiveProps() {
      if (!Meteor.userId()) {
        this.props.history.replace('/login');
      };
    }

    render() {
      return (
        <div>
          <PrivateHeader title="Dashboard"/>
          <div className="page-content">
            <NoteList/>
            <Editor/>
          </div>
        </div>
      )
    }
  }

  export default withRouter(Dashboard);