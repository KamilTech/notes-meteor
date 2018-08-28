import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
    const mapNote = (notes) => {
        return notes.map((note) => {
            return <NoteListItem key={note._id} note={note}/>
        });
    }

    const searchHandler = (e) => {
        const value = e.target.value;

        function escapeRegExp(stringToGoIntoTheRegex) {
            return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        const stringToGoIntoTheRegex = escapeRegExp(e.target.value);
        const regex = new RegExp("^" + stringToGoIntoTheRegex);
        search = { title: regex };
        props.Session.set('Search', search);
    }

    return (
        <div className="item-list">
            <NoteListHeader/>
            <div className="searchButton">
                <input onChange={searchHandler} type="text" placeholder="Search..." name="search"></input>
            </div>
            <div>
                { props.notes.length !== 0 ? mapNote(props.notes) : <NoteListEmptyItem/> }
            </div>
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default withTracker((props) => {
    const selectedNoteId = Session.get('selectedNoteId');
    const searchValue = Session.get('Search');
    Meteor.subscribe('notes');

    return {
        Session,
        notes: Notes.find( searchValue ,{
            sort: {
                updatedAt: -1
            }
        }).fetch().map((note) => {
            return {
                ...note,
                selected: note._id === selectedNoteId
            }
        })
    };
})(NoteList);