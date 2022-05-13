import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

// Users
export const postUsers = (firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments) => (dispatch) => {
    const newUsers = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        qualification: qualification,
        comments: comments
    };

    return fetch(baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify(newUsers),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
        .then(response => dispatch(addUsers(response)))
        .catch(error => {
            console.log('Add Users, ', error.message);
            alert("Your Comment could not be posted \nError:" + error.message)
        });
};


//Thunk dispatch with setTimeout
export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true));

    return fetch(baseUrl + 'users')
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
};



export const updateUsers = (_id, firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments) => (dispatch) => {
    const newUsers = {
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        qualification: qualification,
        comments: comments
    };

    return fetch(baseUrl + 'users', {
        method: 'UPDATE',
        body: JSON.stringify(newUsers),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
        .then(response => dispatch(editUsers(response)))
        .catch(error => {
            console.log('Update Users, ', error.message);
            alert("Your User could not be Updated \nError:" + error.message);
        });
};



export const deleteUsers = (_id) => (dispatch) => {
    const newUsers = {
        _id: _id
    };

    return fetch(baseUrl + 'users/' + _id, {
        method: 'DELETE',
        body: null,
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
        .then(response => dispatch(delUsers(response)))
        .catch(error => {
            console.log('Delete Users, ', error.message);
            alert("User could not deleteted! \nError:" + error.message);
        });

};


export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const editUsers = (users) => ({
    type: ActionTypes.UPDATE_USERS,
    payload: users
});


export const delUsers = (users) => ({
    type: ActionTypes.DELETE_USERS,
    payload: users
});
