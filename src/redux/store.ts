import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import subscriptionsReducer from './slice';

const store = configureStore({
	reducer: { subscriptions: subscriptionsReducer },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
