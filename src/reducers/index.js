import {combineReducers} from 'redux';
import auth from './auth';
import messages from './messages'
import mailbox from './mailbox'

const rootReducer = combineReducers({
    auth,
    messages,
    mailbox
});
export default rootReducer;