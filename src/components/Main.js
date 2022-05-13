import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { deleteUsers, fetchUsers, postUsers, updateUsers } from '../redux/ActionCreators'; // redux
// import { actions } from 'react-redux-form';

import Bio from "./Form";

const mapStateToProps = state => {
    return {
        users: state.users,
    };
};

const mapDispatchToProps = dispatch => ({

    postUsers: (firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments) =>
        dispatch(postUsers(firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments)),

    updateUsers: (_id, firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments) =>
        dispatch(updateUsers(_id, firstName, lastName, email, phoneNumber, address1, address2, city, state, zipCode, country, qualification, comments)),

    deleteUsers: (_id) => dispatch(deleteUsers(_id)),

    fetchUsers: () => { dispatch(fetchUsers()) }, // call thunk
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const HomePage = () => {
            return (
                <>
                    <Bio
                        user={this.props.users.users}
                        usersLoading={this.props.users.isLoading}
                        usersErrMess={this.props.users.errMess}
                        postUsers={this.props.postUsers}
                        updateUsers={this.props.updateUsers}
                        deleteUsers={this.props.deleteUsers}
                    />
                </>
            );
        };

        return (
            <div className="App">
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/home" component={() => <Bio users={this.props.users.users} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
