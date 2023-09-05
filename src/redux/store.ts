import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
    // Reducer is just a function that takes in a action and previous state and then it make some changes in the state and return new value.
    reducer:{
        authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector; 