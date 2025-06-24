import { configureStore } from "@reduxjs/toolkit";
import TopSearchSlice from "./slices/TopSearchSlice";

const store = configureStore({
    reducer: {
        topSearch: TopSearchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;