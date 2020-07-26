import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '..';

const siteSlice = createSlice({
  name: 'site',
  initialState: [],
  reducers: {
    add: (state, action) => {
      try {
        let payload = action.payload
        state.push(payload)
        // state.push(payload)
    
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export const { add } = siteSlice.actions

export const addSite = (payload: {url: string, name: string, desc: string}): AppThunk => dispatch => {
  dispatch(add(payload))
} 


export default siteSlice.reducer

export const selectSite = (state: RootState) => state.site