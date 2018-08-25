import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export class Dashboard extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (Meteor.userId()) {
        Session.set('selectedNoteId', this.props.match.params.id);
      } else {
        this.props.history.replace('/login');
      }
    }
    componentDidUpdate(prevProps,nextProps) {
      if (this.props != nextProps) {
        if (!Meteor.userId()) {
          prevProps.history.replace({ pathname: '/login' });
        }
      }
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

export default withRouter(Dashboard)