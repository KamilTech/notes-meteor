import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
        <div>
            NoteList { props.notes.length }
            <NoteListHeader/>
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default withTracker(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    };
})(NoteList);