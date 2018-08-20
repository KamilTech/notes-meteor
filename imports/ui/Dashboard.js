import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';

export default class Link extends React.Component {
    componentWillMount() {
      if (!Meteor.userId())
          this.props.history.replace('/login');
    }

    render() {
      return (
        <div>
          <PrivateHeader title="Dashboard"/>
          <div className="page-content">
            dashboard page content
          </div>
        </div>
      )
    }
  }