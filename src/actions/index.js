import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

//anonymous arrow function
export const addReminder = (text, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        text: text,
        dueDate: dueDate
    }
    console.log('action in addReminder', action);
    return action;
}
export const deleteReminder = (id) => {
    //we need to identify them to delete them
    const action = {
        type: DELETE_REMINDER,
        id
    }
    console.log('deleting in actions', action);
    return action;
}

export const clearReminders = () => {
    return {
        type: CLEAR_REMINDERS
    }
}