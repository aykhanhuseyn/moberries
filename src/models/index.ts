export interface SubscriptionPlan {
	duration_months: number;
	price_usd_per_gb: number;
}

export type SubscriptionPlans = Array<SubscriptionPlan>;

export type Message = {
	title: string | null;
	description: string | null;
};

export type Request = {
	status: 'idle' | 'loading' | 'error';
	message: Message | null;
};

export interface IForm {
	parameters: {
		duration: number;
		volume: number;
		upfront: boolean;
	};
	card: {
		pan: string | null;
		exp: string | null;
		cvv: string | null;
	};
	confirm: {
		email: string | null;
	};
}

export type Tabs = {
	enabledTabs: string[];
	active: 'parameters' | 'creditcard' | 'confirm' | string;
}

export type IState = {
	subscription_plans: SubscriptionPlans;
	request: Request;
	form: IForm;
	tabs: Tabs;
};

export interface ITab {
	tab: Element | JSX.Element | string;
	key: string;
	content: Element | JSX.Element | string;
}

export interface IValue {
	label: string;
	value: number | string;
	selected?: boolean;
}

export interface IParameters {
	VOLUMES: Array<IValue>;
	DURATIONS: Array<IValue>;
}
