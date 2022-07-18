import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, refreshAPI } from "../../api/auth.api";
import { getUser } from "../../api/user.api";
import { AuthLogin, AuthState } from "../../model/auth.model";
import { initUser } from "../../model/user.model";
import { AppThunk, RootState } from "../store";

export const jwtTokenActive = "jwt";
export const jwtTokenRefresh = "refresh";

const initialState: AuthState = {
    user: initUser,
    role: null,
    loading: false,
    error: ""
}

export const login = createAsyncThunk(
    '[auth] login',
    async (data: AuthLogin) => {
        const response = await loginAPI(data);
        if (response.status === 200) {
            localStorage.setItem(jwtTokenActive, response.data.access_token);
            localStorage.setItem(jwtTokenRefresh, response.data.refresh_token);
            const user = await getUser(response.data.id);
            return user.data;
        } else {
            return "cannot load user data";
        }
    }
)

export const refresh = createAsyncThunk(
    '[auth] refresh',
    async () => {
        const response = await refreshAPI();
        if (response.status === 200) {
            const user = await getUser(response.data.id);
            return user.data;
        } else {
            return "cannot load user data";
        }
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
            state.user = initialState.user;
            state.loading = false;
            state.error = "";
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.user = initialState.user;
                state.role = null;
                state.loading = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.role = action.payload.roles[0];
                state.loading = false;
                state.error = "";
            })
            .addCase(login.rejected, (state) => {
                state.user = initialState.user;
                state.role = null;
                state.loading = false;
                state.error = "Login error";
            })
            .addCase(refresh.pending, (state) => {
                state.user = initialState.user;
                state.role = null;
                state.loading = true;
                state.error = "";
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.user = action.payload;
                state.role = action.payload.roles[0];
                state.loading = false;
                state.error = "";
            })
            .addCase(refresh.rejected, (state) => {
                state.user = initialState.user;
                state.role = null;
                state.loading = false;
                state.error = "";
            });
    },
});

const { authLogout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;