// third-party
import { combineReducers } from 'redux';

// project import
import wallet from './wallet';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  wallet, 
});

export default reducers;
