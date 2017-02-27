import {
    BEGIN_FILTER_CHANGE,
    SET_PENDING_SUBJECT,
    SET_PENDING_TAG,
    END_FILTER_CHANGE,
    SET_FILTERS,
    SET_PENDING,
    APPLY_PENDING_SEARCH,
    SET_VIEWING_USERID,
    SET_SEARCH_SUBJECTS_VALUE,
    SET_SEARCH_TAGS_VALUE,
    SET_GRID_VIEW,
    SET_BASIC_LIST_VIEW,
    GRID_VIEW,
    BASIC_LIST_VIEW
} from './actionNames';

import { loadBooks } from '../books/actionCreators';
import { loadSubjects } from 'applicationRoot/rootReducerActionCreators';
import { loadTags } from '../tags/actionCreators';

import { globalHashManager } from 'reactStartup';

export const setViewDesktop = view => ({ type: SET_GRID_VIEW });
export const setViewBasicList = view => ({ type: SET_BASIC_LIST_VIEW });

export function beginFilterChange(){
    return { type: BEGIN_FILTER_CHANGE };
}

export function setSearchSubjectsValue(obj){
    return { type: SET_SEARCH_SUBJECTS_VALUE, value: obj.target.value || '' };
}

export function setSearchTagsValue(obj){
    return { type: SET_SEARCH_TAGS_VALUE, value: obj.target.value || '' };
}

export function addPendingSubject({ _id }){
    return { type: SET_PENDING_SUBJECT, _id, value: true };
}

export function removePendingSubject(_id){
    return { type: SET_PENDING_SUBJECT, _id, value: false };
}

export function addPendingTag({ _id }){
    return { type: SET_PENDING_TAG, _id, value: true };
}

export function removePendingTag(_id){
    return { type: SET_PENDING_TAG, _id, value: false };
}

export function endFilterChanging(){
    return { type: END_FILTER_CHANGE };
}

export function applyFilters(){
    return function(dispatch, getState) {
        let state = getState().booksModule.bookSearch,
            filterSubjectsVal = Object.keys(state.pending.subjects).filter(k => state.pending.subjects[k]).join('-'),
            filterTagsVal = Object.keys(state.pending.tags).filter(k => state.pending.tags[k]).join('-'),
            pending = state.pending;

        globalHashManager.setValues(
            'page', null,
            'search', pending.search,
            'subjects', filterSubjectsVal,
            'tags', filterTagsVal,
            'searchChildSubjects', pending.searchChildSubjects && filterSubjectsVal ? 'true' : null,
            'author', pending.author,
            'publisher', pending.publisher,
            'pagesOperator', pending.pages != '' ? pending.pagesOperator : null,
            'pages', pending.pages,
            'isRead', pending.isRead
        );
        dispatch(endFilterChanging());
    }
}

export function setSortOrder(sort, direction){
    return function(dispatch, getState){
        globalHashManager.setValues(
            'sort', sort,
            'sortDirection', direction == 1 ? 'asc' : 'desc'
        );
    };
}

export function booksActivated(searchProps){
    return function(dispatch, getState){
        let nextSearchFilters = getNextFilters(searchProps.parameters),
            state = getState(),
            booksState = state.booksModule.books,
            subjectsState = state.booksModule.subjects,
            tagsState = state.booksModule.tags;

        //not the most beautiful thing, but I'll use this activation to make sure initial subject and tag load calls are made
        if (!subjectsState.initialQueryFired){
            dispatch(loadSubjects());
        }

        if (!tagsState.initialQueryFired){
            dispatch(loadTags());
        }

        if (booksState.reloadOnActivate || !booksState.initialQueryFired){
            dispatch(setFilters(nextSearchFilters));
            dispatch(loadBooks());
        }
    }
}

export function syncFiltersToHash(searchProps){
    return function(dispatch, getState){
        let nextSearchFilters = getNextFilters(searchProps),
            state = getState(),
            searchState = state.booksModule.bookSearch;
        if (!nextSearchFilters.sort){
            nextSearchFilters.sort = '_id';
        }
        if (!nextSearchFilters.sortDirection){
            nextSearchFilters.sortDirection = '-1';
        }

        if (isDirty(searchState, nextSearchFilters)){
            dispatch(setFilters(nextSearchFilters));
            dispatch(loadBooks());
        }
    };
}

const getNextFilters = searchProps =>
    Object.assign({}, searchProps, {
        subjects: idStringToObject(searchProps.subjects),
        tags: idStringToObject(searchProps.tags),
        searchChildSubjects: searchProps.searchChildSubjects ? true : null,
        sortDirection: searchProps.sortDirection == 'asc' ? 1 : -1
    });

const idStringToObject = (str = '') => str.split('-').filter(s => s).reduce((obj, val) => (obj[val] = true, obj), {});

export function setFilters(packet){
    return { type: SET_FILTERS, packet }
}

function isDirty(oldState, newState){
    if (itemsDifferent(oldState.subjects, newState.subjects)) return true;
    if (itemsDifferent(oldState.tags, newState.tags)) return true;
    if (oldState.pagesOperator != (newState.pagesOperator || '>')){
        if (newState.pages !== '') return true;
    }

    return !!['search', 'author', 'publisher', 'page', 'pages', 'sort', 'sortDirection'].filter(prop => oldState[prop] != (newState[prop] || '')).length;
}

const itemsDifferent = (oldItems, newItems) =>
    Object.keys(oldItems).filter(k => oldItems[k]).sort().join('-') !== Object.keys(newItems).filter(k => newItems[k]).sort().join('-');

export function removeFilterSubject(_id) {
    return function(dispatch, getState) {
        let state = getState().booksModule.bookSearch,
            newSubjects = Object.keys(state.subjects).filter(sId => sId != _id).join('-');

        globalHashManager.setValues(
            'subjects', newSubjects,
            'searchChildSubjects', state.searchChildSubjects && newSubjects ? 'true' : null
        );
    };
}

export function removeFilterTag(_id){
    return function(dispatch, getState) {
        let state = getState().booksModule.bookSearch,
            newTags = Object.keys(state.tags).filter(sId => sId != _id).join('-');

        globalHashManager.setValues('tags', newTags);
    };
}

function createPendingActionCreator(name, getEvtValue = evt => evt.target.value){
    return function (evt) {
        return function (dispatch, getState) {
            if (evt.which === 13){
                dispatch(applyFilters());
            } else {
                dispatch({type: SET_PENDING, field: name, value: getEvtValue(evt)})
            }
        };
    }
}

export function pageUp(){
    return function(dispatch, getState){
        let state = getState().booksModule.bookSearch;
        globalHashManager.setValues('page', +state.page + 1);
    };
}

export function pageDown(){
    return function(dispatch, getState){
        let state = getState().booksModule.bookSearch;
        globalHashManager.setValues('page', +state.page == 2 ? null : state.page - 1);
    };
}

export const setPendingSearch = createPendingActionCreator('search');
export const setPendingSubjects = createPendingActionCreator('subjects');
export const setPendingSearchChildSubjects = createPendingActionCreator('searchChildSubjects', evt => evt.target.checked);
export const setPendingAuthor = createPendingActionCreator('author');
export const setPendingPublisher = createPendingActionCreator('publisher');
export const setPendingPages = createPendingActionCreator('pages');
export const setPendingPagesOperator = createPendingActionCreator('pagesOperator');
export const setPendingIsRead = createPendingActionCreator('isRead');

export function setViewingUserId(_id){
    return { type: SET_VIEWING_USERID, _id }
}