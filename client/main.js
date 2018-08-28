import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import createHistory from 'history/createBrowserHistory';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

const browserHistory = createHistory();

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Session.set('isNavOpen', false);

    if (selectedNoteId) {
      browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  search = new RegExp("^","");
  Session.set('Search', search);
  ReactDOM.render(routes, document.getElementById('app'));
});
