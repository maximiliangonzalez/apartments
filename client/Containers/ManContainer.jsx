import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MessageContainer from './MessageContainer.jsx';
import PaymentContainer from './PaymentContainer.jsx';
import EventsContainer from './EventsContainer.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  // add pertinent state here
  userId: store.user.userId,
  role: store.user.role,
  aptList: store.user.aptList
})



class ManContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    }

  }

  componentDidMount() {
    fetch('/allUsers', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => this.setState({
      userList: res
    }))
    .catch(err => console.log(err));
  }

  //component did mount get all users and save eventList and UserList in props and send to respective components.
  render() {

    return (
      <Router>
        <div>
          <nav>
        <Link to={`/payments`}>Payments</Link>
        <Link to={`/chat`}>Messages</Link>
        <Link to={`/events`}>Events</Link>
      </nav>

      <main>
        <Route path="/payments" render={(props) => <PaymentContainer aptList={this.props.aptList} userId={this.props.userId} role={this.props.role} isAuthed={true} />} />
        <Route path="/chat" render={(props) => <MessageContainer userList={this.state.userList} userId={this.props.userId} role={this.props.role} isAuthed={true}/>} />
        <Route path="/events" render={(props) => <EventsContainer userList={this.state.userList} userId={this.props.userId} role={this.props.role} isAuthed={true}/>} />
      </main>
        </div>
      </Router>
    );
  } 
}

export default connect(mapStateToProps)(ManContainer);