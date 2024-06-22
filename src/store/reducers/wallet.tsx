/* eslint-disable @typescript-eslint/no-explicit-any */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/api';
import { dispatch } from '../index';

// types
import { walletProfile, walletStateProps } from '../../types/wallet';

// ----------------------------------------------------------------------
const initialState: walletStateProps = {
  error: null,
  user: {
      wallet_address: '',
      balance: 0,
      energy: 500,
      recoveryDate: '',
      createdDate: '',
      latestDate: '',
      weeklyIncRFP: 0,
      monthlyIncRFP: 0
  },
  users: [],
  currentDate: '',
};

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USER
   
    updateUser(state, action) {
      return {
        ...state, // Spread the existing state to maintain immutability
        user: action.payload, // Replace the user property with the new payload
      };
    }, 
    updateCurrentDate(state, action) {
      return {
        ...state,
        currentDate: action.payload
      }
    },    
    updateAllWallets(state, action) {
      return {
        ...state, // Spread the existing state to maintain immutability
        users: action.payload, // Replace the user property with the new payload
      };
    }
  }
});

// Reducer
export default wallet.reducer;

// ----------------------------------------------------------------------


export function insertWallet(wallet_address: string) {
  
  return async () => {
    try {
      const response = await axios.post('/wallet/add', { wallet_address });
      dispatch(wallet.actions.updateUser(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}

// Update data of store in real-time
export function updateUserInfo(tempUser: walletProfile) 
{
  return async () => {
    try {
      dispatch(wallet.actions.updateUser(tempUser));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}

//Update data of DB after 200ms when it is clicked for "Shoot" button.
export function updateUserInfoDB(tempUser: walletProfile) {
  return async () => {
    await axios.post("/wallet/update", tempUser);
  }
}

// Get data of current user from DB.
export function getWallet(wallet_address: number) {
  return async () => {
    try {
      const response = await axios.post('/wallet/currentuserinfo', { wallet_address });
      dispatch(wallet.actions.updateUser(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}

// Get all of wallet's info
export function getAllWallets() {
  return async () => {
    try {
      const response = await axios.post("/wallet/all");
      dispatch(wallet.actions.updateAllWallets(response.data));
    } catch (error) {
      wallet.actions.hasError(error);
    }
  }
}

// Get and update for date of date, time
export function getCurrentTime(tempUser: walletProfile) {
  console.log("current", tempUser);
  
  return async () => {
    try {
      const response = await axios.post("/wallet/current_time", {wallet_address: tempUser.wallet_address});

      dispatch(wallet.actions.updateCurrentDate(response.data.currentDate));
      dispatch(wallet.actions.updateUser({...tempUser,
          createdDate: response.data.createdDate,
          recoveryDate: response.data.recoveryDate
       }
      ));
    } catch (error) {
      wallet.actions.hasError(error);
    }
  }
}

