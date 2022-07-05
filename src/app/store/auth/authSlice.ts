import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, refreshAPI } from "../../api/auth.api";
import { getUser } from "../../api/user.api";
import { AuthLogin, AuthState } from "../../model/auth.model";
import { AppThunk, RootState } from "../store";

export const jwtTokenActive = "jwt";
export const jwtTokenRefresh = "refresh";

const initialState: AuthState = {

}

export const login = createAsyncThunk(
    '[auth] login',
    async (data: AuthLogin) => {
        const response = await loginAPI(data);
        if (response.status === 200) {
            localStorage.setItem(jwtTokenActive, response.data.access_token);
            localStorage.setItem(jwtTokenRefresh, response.data.refresh_token);
            const user = await getUser(response.data.id);
            return user;
        } else {
            return response.data;
        }
    }
)

export const refresh = createAsyncThunk(
    '[auth] refresh',
    async () => {
        const response = await refreshAPI();
        return response.data;
    }
)

export const logout = (): AppThunk => (dispatch) => {
    localStorage.removeItem(jwtTokenActive);
    localStorage.removeItem(jwtTokenRefresh);
    dispatch(authLogout());
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {

            })
            .addCase(login.fulfilled, (state, action) => {
                
            })
            .addCase(login.rejected, (state) => {

            })
            .addCase(refresh.pending, (state) => {
                
            })
            .addCase(refresh.fulfilled, (state, action) => {
               
            })
            .addCase(refresh.rejected, (state) => {
                
            });
    },
});

const { authLogout } = authSlice.actions;
export const selectCount = (state: RootState) => state.auth;
export default authSlice.reducer;