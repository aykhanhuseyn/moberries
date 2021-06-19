import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';
import { SUBSCRIPTION as s } from '../api/routes';
import { Message, IState, SubscriptionPlans } from '../models';
import requestHandler from '../util/requestHandler';
import { RootState } from './store';

const initial: IState = {
	subscription_plans: [],
	tabs: {
		enabledTabs: ['parameters', 'creditcard'],
		active: 'parameters',
	},
	form: {
		parameters: {
			duration: 12,
			volume: 5,
			upfront: false,
		},
		card: {
			pan: null,
			exp: null,
			cvv: null,
		},
		confirm: {
			email: null,
		},
	},
	request: {
		status: 'idle',
		message: null,
	},
};
export const fetchPrices = createAsyncThunk(
	'subscriptions/fetchPrices',
	async (_: void, { rejectWithValue }): Promise<any> => {
		try {
			const data = await requestHandler(axios.get, s.PRICES);
			const subscriptions: SubscriptionPlans = data.subscription_plans;
			console.log('object', data.subscription_plans);
			return subscriptions;
		} catch (e) {
			process?.env?.NODE_ENV === 'development' && console.log(e);
			return rejectWithValue(e);
		}
	}
);

export const submitSubscription = createAsyncThunk(
	'subscriptions/submitSubscription',
	async (data) => axios.post(s.SUBMIT, data)
);

export const subscriptionsSlice = createSlice({
	name: 'subscriptions',
	initialState: initial,
	reducers: {
		setSubscriptions: (state, { payload }) => {
			state.subscription_plans = payload;
		},
		setLoading: (state, { payload }) => {
			state.request.status = payload;
		},
		setError: (state, { payload }) => {
			state.request.message = {
				title: payload?.title,
				description: payload?.description,
			};
		},
		setDuration: (state, { payload }) => {
			state.form.parameters.duration = payload;
		},
		setVolume: (state, { payload }) => {
			state.form.parameters.volume = payload;
		},
		setUpfront: (state, { payload }) => {
			state.form.parameters.upfront = payload;
		},
		setCard: (state, { payload }) => {
			state.form.card = {
				pan: payload?.pan || null,
				cvv: payload?.cvv || null,
				exp: payload?.exp || null,
			};
		},
		setEmail: (state, { payload }) => {
			state.form.confirm.email = payload;
		},
		setActiveTab: (state, { payload }) => {
			state.tabs.active = payload;
		},
		enableTab: (state, { payload }) => {
			state.tabs.enabledTabs = [...state.tabs.enabledTabs, payload];
		},
		disableTab: (state, { payload }) => {
			state.tabs.enabledTabs = [
				...state.tabs.enabledTabs.filter((x) => x !== payload),
			];
		},
	},
	extraReducers: {
		'subscriptions/fetchPrices/pending': function (state: IState): IState {
			return {
				...state,
				request: {
					...state.request,
					status: 'loading',
				},
			};
		},
		'subscriptions/fetchPrices/fulfilled': function (state, { payload }): IState {
			return {
				...state,
				subscription_plans: payload,
				request: {
					status: 'idle',
					message: null,
				},
			};
		},
		'subscriptions/fetchPrices/rejected': function (
			state: IState,
			action: { payload: Message }
		): IState {
			return {
				...state,
				request: {
					status: 'error',
					message: {
						title: action.payload.title,
						description: action.payload.description,
					},
				},
			};
		},
		// [submitSubscription.pending]: (state) => ({
		// 	...state,
		// 	request: {
		// 		...state.request,
		// 		status: 'loading',
		// 	},
		// }),
		// [submitSubscription.fulfilled]: (_, { payload }) => ({
		// 	subscription_plans: payload,
		// 	request: {
		// 		status: 'idle',
		// 		message: null,
		// 	},
		// }),
		// [submitSubscription.rejected]: (state, { payload }) => ({
		// 	...state,
		// 	request: {
		// 		status: 'error',
		// 		message: {
		// 			title: payload.error,
		// 			description: payload.description,
		// 		},
		// 	},
		// }),
	},
});

export const {
	setLoading,
	setError,
	setSubscriptions,
	setVolume,
	setDuration,
	setUpfront,
	setCard,
	setEmail,
	setActiveTab,
	enableTab,
	disableTab,
} = subscriptionsSlice.actions;

export const getDuration = (store: RootState) =>
	store.subscriptions.form.parameters.duration;
export const getVolume = (store: RootState) =>
	store.subscriptions.form.parameters.volume;
export const getUpfront = (store: RootState) =>
	store.subscriptions.form.parameters.upfront;
export const getParameters = (store: RootState) =>
	store.subscriptions.form.parameters;
export const getLoading = (store: RootState) =>
	store.subscriptions.request.status;
export const getStatus = (store: RootState) => store.subscriptions.request;
export const getSubcriptionPlans = (store: RootState) =>
	store.subscriptions.subscription_plans;
export const getActiveTab = (store: RootState) =>
	store.subscriptions.tabs.active;
export const getEnabledTabs = (store: RootState) =>
	store.subscriptions.tabs.enabledTabs;

export default subscriptionsSlice.reducer;
