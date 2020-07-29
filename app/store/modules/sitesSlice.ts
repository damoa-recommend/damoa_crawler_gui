import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '..';

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    selectedSiteIdx: -1,
    sites: [
      // {
      //   url: 'http://www.naver.com',
      //   name: 'naver',
      //   desc: 'naver desc'
      // }
    ],
    
  },
  reducers: {
    add: (state, action) => {
      try {
        let payload = action.payload
        state.sites.push(payload)
        // state.push(payload)
    
      } catch (err) {
        console.log(err)
      }
    },
    choise: (state, action) => {
      console.log('choise')
      console.log(action.payload)
      let { selectedSiteIdx } = action.payload
      state.selectedSiteIdx = selectedSiteIdx
    }
  }
})

export const { add, choise } = siteSlice.actions

export const addSite = (payload: {url: string, name: string, desc: string}): AppThunk => dispatch => {
  dispatch(add(payload))
} 

export const select = (payload: {selectedSiteIdx: number}) :AppThunk => dispatch => {
  dispatch(choise(payload))
}

export default siteSlice.reducer

export const selectSites = (state: RootState) => state.site.sites
export const selectSiteIdx = (state: RootState) => state.site.selectedSiteIdx