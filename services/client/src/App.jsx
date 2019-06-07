import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Signout from './components/Signout';
import CurrentUser from './components/CurrentUser';

/* 
Class based component. Runs when instance is created.
super() calls constructor of Component
*/
class App extends Component {
    constructor() {
        super();
        // adds state property to class, state begins as empty array
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
            title: 'Code Bites',
            formData: {
                username: '',
                email: '',
                password: '',
            },
            isAuthenticated: false,
        };

        // https://reactjs.org/docs/handling-events.html
        this.addUser = this.addUser.bind(this); // binds the context of 'this' 
        this.handleChange = this.handleChange.bind(this);
        this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.clearFormState = this.clearFormState.bind(this);
        this.signoutUser = this.signoutUser.bind(this);
    };
    // Avoids race condition, fire after DOM rendered
    componentDidMount() {
        this.getUsers();
    };
    //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    componentWillMount() {
      if (window.localStorage.getItem('token')) {
        this.setState({ isAuthenticated: true });
      };
    };

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj)
    }

    handleUserFormSubmit(event) {
        event.preventDefault();
        const formType = window.location.href.split('/').reverse()[0];
        let data = {
          email: this.state.formData.email,
          password: this.state.formData.password,
        };
        if (formType === 'register') {
          data.username = this.state.formData.username
        }
        const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/login/${formType}`
        axios.post(url, data)
        .then((res) => {
          console.log(res.data);
          this.clearFormState();
          window.localStorage.setItem('token', res.data.token);
          this.setState({ isAuthenticated: true, });
          this.getUsers();
          
        })
        .catch((err) => { console.log(err) })
        
    };
    // Handler for any form change, i.e. input
    handleFormChange(event) {
      const obj = this.state.formData;
      obj[event.target.name] = event.target.value
      this.setState(obj);
      console.log(this.state.formData);
    }

    clearFormState(event) {
      this.setState({
        formData: { username: '', email: '', password: ''},
        username: '',
        email: '',
      });
    };

    addUser(event) {
        event.preventDefault();
        // bundle up the data
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };
        // ajax request to backend
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
        .then((res) => { 
            this.getUsers(); //update users list
            this.setState( {username: '', email: '', password: '' }) }) //reset form state
        .catch((err) => { console.log(err.response); });
    };

    signoutUser(event) {
      window.localStorage.clear();
      this.setState( { isAuthenticated: false });
    };

  render() {
    return (
      <div>
        <NavBar title={this.state.title} isAuthenticated={this.state.isAuthenticated}/>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-three-quarters">
                <br />
                <Switch>
                  <Route exact path='/' render={() => (
                  <UsersList users={this.state.users}/>
                  )} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' render={() => (
                      <Form
                        formType={'Register'}
                        formData={this.state.formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                        isAuthenticated={this.state.isAuthenticated}
                        />
                  )} />
                  <Route exact path='/login' render={() => (
                      <Form 
                      formType={'Login'}
                      formData={this.state.formData}
                      handleUserFormSubmit={this.handleUserFormSubmit}
                      handleFormChange={this.handleFormChange}
                      isAuthenticated={this.state.isAuthenticated}
                      />
                  )} />
                  <Route exact path='/signout' render={() => (
                    <Signout
                      signoutUser={this.signoutUser}
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  )} />
                  <Route exact path='/me' render={() => (
                    <CurrentUser isAuthenticated={this.state.isAuthenticated}
                  />
                  )}/>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  };

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => { this.setState({ users: res.data.data.users }); })
        .catch((err) => { console.log(err); });
    };



};

export default App;