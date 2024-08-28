import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    subCategoryItem: [],
    productListItem: [],
    Auth: [],
    adminCategory: [],
    GetroleName: [],
    planId: [],
    updateName: [],
    companyid: [],
    userid: [],
    orderid: [],
    Favouriteid: [],

}
const categorySlice = createSlice({
    name: 'categoryState', initialState,
    reducers: {
        setSubCategoryItem: (state, action) => {
            state.subCategoryItem = action.payload;
        },
        setProductListItem: (state, action) => {
            state.productListItem = action.payload;
        },
        Auth: (state, action) => {
            state.Auth = action.payload;
        },
        adminCategory: (state, action) => {
            state.adminCategory = action.payload;
        },
        defaultName: (state, action) => {
            state.updateName = action.payload
        },
        setPlanId: (state, action) => {
            state.planId = action.payload;
        },
        setCompanyid: (state, action) => {
            state.companyid = action.payload;
        },
        setUserid: (state, action) => {
            state.userid = action.payload;
        },
        setOrderid: (state, action) => {
            state.orderid = action.payload;
        },
        setFavouriteid: (state, action) => {
            state.Favouriteid = action.payload;
        },

    },
});
export const { setSubCategoryItem, setProductListItem,
     Auth, adminCategory, defaultName, setPlanId, setCompanyid,
      setUserid, setOrderid, setFavouriteid } = categorySlice.actions;
export default categorySlice.reducer;