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
      ranking: 1,
      wallet_address: '',
      balance: 0,
      energy: 500,
      level: 0,
      recoveryEnergyTime: '1970-01-01',
      createdDate: '1970-01-01'
  },
  users: []
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

export function insertWallet(wallet_address: string) {
  console.log("First Loading...", wallet_address);
  
  return async () => {
    try {
      const response = await axios.post('/wallet/add', { wallet_address });
      dispatch(wallet.actions.updateUser(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}

export function updateUserInfo(wallet_address: string, balance: number, energy: number) {
  console.log("update...", wallet_address, balance, energy );
  
  return async () => {
    try {
      await axios.post("/wallet/update", { 
        wallet_address,
        balance,
        energy
      });
      // console.log("updateUserInfo", response.data);
      // dispatch(wallet.actions.updateUserInfoReducer(Object.assign({...response.data} )));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}

export function getAllWallets(tempUser: walletProfile) {
  console.log(tempUser);
  
  return async () => {
    try {
      
      const response = await axios.post("/wallet/all");
      const ranking = response.data.findIndex((_user: any) => _user.wallet_address == tempUser.wallet_address) + 1;

      dispatch(wallet.actions.updateUser(Object.assign({...tempUser, ranking} )));
      dispatch(wallet.actions.updateAllWallets(response.data));
    } catch (error) {
      wallet.actions.hasError(error);
    }
  }

}

export function getCurrentTime(tempUser: walletProfile) {
  console.log("update", tempUser);
  
  return async () => {
    try {
      const response = await axios.post("/wallet/current_time", {wallet_address: tempUser.wallet_address});
      
      dispatch(wallet.actions.updateUser(
        Object.assign({}, tempUser, {
          createdDate: response.data.createdDate,
          recoveryEnergyTime: response.data.recovery_energy_time
        })
      ));
    } catch (error) {
      wallet.actions.hasError(error);
    }
  }
}

export function updateOnlyUserStore(tempUser: walletProfile) {
  return dispatch(wallet.actions.updateUser(Object.assign({...tempUser, ranking:0} )));
  
}
