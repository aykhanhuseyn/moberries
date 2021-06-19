import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import parameters from '../../entities/subscription_parameters';
import { getSubcriptionPlans, getParameters } from '../../redux/slice';
import s from './total.module.scss';

const Total = () => {
	const plans = useSelector(getSubcriptionPlans);
	const store = useSelector(getParameters);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		const perGb: number =
			plans.find((x) => x.duration_months === store.duration)?.price_usd_per_gb ||
			0;
		const p = perGb * store.volume * (store.upfront ? 0.9 : 1);
		setAmount(p);
	}, [plans, store]);

	return (
		<div className={s._container}>
			<p className={s._text}>
				{'Volume: '}
				<span className={s._text__value}>
					{parameters.VOLUMES.find((x) => x.value === store.volume)?.label}
				</span>
			</p>
			<p className={s._text}>
				{'Duration with month: '}
				<span className={s._text__value}>
					{parameters.DURATIONS.find((x) => x.value === store.duration)?.label}
				</span>
			</p>
			<p className={s._text}>
				{'Amount: '}
				<span className={s._text__value}>
					{store.upfront ? `$${amount * store.duration}` : `$${amount} / per month`}
				</span>
				<span>
					{store.upfront
						? '  (10% discount applied)'
						: `  (Total: $${amount * store.duration})`}
				</span>
			</p>
		</div>
	);
};

export default Total;
