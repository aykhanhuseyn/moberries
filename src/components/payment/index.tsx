import { useSelector, useDispatch } from 'react-redux';
import { Radio, Form, Switch, Button, notification } from 'antd';
import {
	getVolume,
	setVolume,
	getDuration,
	setDuration,
	getUpfront,
	setUpfront,
	setActiveTab,
} from '../../redux/slice';
import { IValue } from '../../models';
import Title from '../shared/title';
import Volume from './volume';
import s from './payment.module.scss';
import parameters from '../../entities/subscription_parameters';

const Payment = () => {
	const dispatch = useDispatch();
	const volumes: IValue[] = parameters.VOLUMES;
	const volume: number = useSelector(getVolume);
	const durations: IValue[] = parameters.DURATIONS;
	const duration: number = useSelector(getDuration);
	const upfront: boolean = useSelector(getUpfront);

	const onChangeVolumes: (selected: string) => void = (selected: string) => {
		dispatch(setVolume(+selected));
	};
	const onChangeDurations: (selected: string) => void = (selected: string) => {
		dispatch(setDuration(+selected));
	};
	const onChangeUpfont: (value: boolean) => void = (value: boolean) => {
		dispatch(setUpfront(value));
		notification.info({
			message: `Discount ${value ? 'enabled' : 'disabled'}.`,
		});
	};

	const onSubmit = (values: any) => {
		console.log(values);
		dispatch(setActiveTab('creditcard'));
	};

	const styles = {
		display: 'grid',
		gridTemplateColumns: 'minmax(110px, max-content) auto',
		gap: '10px',
		marginBottom: '30px',
	};

	return (
		<Form onFinish={onSubmit}>
			<Title
				className={s._title}
				text='Select subscription parameters.'
				element='h4'
				size='md'
				style={{ margin: '10px 0 20px 20px' }}
			/>
			<Form.Item label='Volumes' name='volume' style={styles}>
				<Radio.Group
					className={s._radio}
					options={volumes?.map((x) => ({
						label: (
							<Volume value={x.value} label={x.label} selected={x.value === volume} />
						),
						value: x.value,
					}))}
					onChange={({ target: { value } }) => onChangeVolumes(value)}
					optionType='button'
					style={{ marginBottom: '10px' }}
				/>
			</Form.Item>

			<Form.Item label='Durations' name='duration' style={styles}>
				<Radio.Group
					className={s._radio}
					options={durations?.map((x) => ({
						label: (
							<Volume
								value={x.value}
								label={x.label}
								selected={x.value === duration}
							/>
						),
						value: x.value,
					}))}
					onChange={({ target: { value } }) => onChangeDurations(value)}
					optionType='button'
				/>
			</Form.Item>

			<Form.Item
				label='Upfront payment: '
				name='upfront'
				initialValue={upfront}
				help='You will get 10% discount for upfront payment.'
				style={styles}
			>
				<Switch
					checkedChildren='Yes'
					unCheckedChildren='No'
					onChange={(c: boolean) => onChangeUpfont(c)}
					checked={upfront}
				/>
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					size='large'
					style={{ width: '100%' }}
				>
					Next
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Payment;
