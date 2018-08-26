import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export class Dashboard extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (this.props.user) {
        Session.set('selectedNoteId', this.props.match.params.id);
      } else {
        this.props.history.replace('/login');
      }
    }
    componentDidUpdate(prevProps) {
        if (!this.props.user) {
          this.props.history.replace({ pathname: '/login' });
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

Dashboard.propTypes = {
    user: PropTypes.bool.isRequired
};

export default withTracker(() => {
  return { user: !!Meteor.userId() }
})(Dashboard);