import React, { Component } from 'react';
import { connect } from 'react-redux'; //hooking up two functions to react components
import { addReminder, deleteReminder } from '../actions';
import '../App.css';
import moment from 'moment'; //returns a human friendly string of a date

//redux has one huge store, holding the application and store is a global object and it holds the applications state
//and it allows the state to be updated with actions. So I can change state with actions
//actions = plain JS objects (need a type property)
//ACTION CREATER actions need to be created in a function that returns the actions

class App extends Component {
    constructor(props){
        super(props);
            this.state = {
                text: '',
                dueDate: ''
            }
        }

    addReminder(){
        console.log('this', this);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id){
        console.log('deleting in application', id);
        console.log('this.props', this.props);
        this.props.deleteReminder(id);
    }

    renderReminders(){
        //returning an unordered list of reminders submitted by the user
        //access reminders
        const { reminders } = this.props;
        return (
            <ul className="list">
                {/*map over reminders so we can render each reminder induvidual as another list component*/}
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="listItem">
                                <div className="wrapperReminder">
                                    <div className="textReminder">{reminder.text}</div>
                                    <div className="dueDate">{moment(new Date(reminder.dueDate)).fromNow()}</div>
                                </div>
                                <button className="deleteBtn"
                                onClick={() => this.deleteReminder(reminder.id)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        console.log('this.props', this.props);
        return(
            <div className="App">
                <div className="appTitle">
                    Maddies Reminders
                </div>
                <div className="form">
                    <input 
                        className="formInput"
                        placeholder="Type your next reminder here.."
                        onChange={event => this.setState({text: event.target.value})}
                    />
                    <input 
                        className="dateInput"
                        type="datetime-local"
                        onChange={event => this.setState({dueDate: event.target.value})}
                    />
                    <button
                        type="button"
                        className="addBtn"
                        onClick= { () => this.addReminder()}
                        >
                        Add reminder
                    </button>
                </div>
                { this.renderReminders() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        reminders: state
    }
}

//calling connect function from redux
export default connect(mapStateToProps, { addReminder, deleteReminder })(App);