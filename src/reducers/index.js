import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies'; //handles cookies so we can store reminders in browser

const reminder = (action) => {
    let { text, dueDate } = action;
    return {
        id: Math.random(),
        text,
        dueDate
    }
}

const removeById = (state = [], id) => {
    //returns a new array of data
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}

const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie('reminders');
    switch(action.type){
        case ADD_REMINDER:
            //spread operator
            reminders = [...state, reminder(action)];
            //adding reminder to browser
            bake_cookie('reminders', reminders);
                return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            return reminders;
        case CLEAR_REMINDERS:
            //setting reminders to an empty array
            reminders = [];
            bake_cookie('reminders', reminders);
            return reminders; 
            //always need default in a switch statement
        default:
            return state;
    }
}
//need to export so my other modules can recognize
export default reminders;