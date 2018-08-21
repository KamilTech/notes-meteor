import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      if (!Meteor.userId()) {
        this.props.history.replace('/login');
      } else {
        Session.set('selectedNoteId', this.props.match.params.id)
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