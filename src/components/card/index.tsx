import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import Title from '../shared/title';
import Cleave from 'cleave.js/react';
import moment from 'moment';
import s from '../payment/payment.module.scss';
import {
	setActiveTab,
	enableTab,
	disableTab,
	setCard,
} from '../../redux/slice';
import luhnCheck from '../../util/luhnCheck';

const CardForm = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onFinish = async (values: { pan: string; exp: string; cvv: string }) => {
		process.env.NODE_ENV === 'development' && console.log(values);
		await dispatch(setCard(values));
		await dispatch(enableTab('confirm'));
		dispatch(setActiveTab('confirm'));
	};

	const onReset = async () => {
		form.resetFields();
		await dispatch(disableTab('confirm'));
	};

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name='credit-card'
			onFinish={onFinish}
		>
			<Title
				className={s._title}
				text='Add payment details.'
				element='h4'
				size='md'
				style={{ margin: '10px 0 20px 20px', justifyContent: 'center' }}
			/>

			<Form.Item
				name='pan'
				label='Card Number'
				rules={[
					{ required: true, message: 'Card Number is required!' },
					{ len: 19, message: 'Card have to contain 16 digits.' },
					{
						validator(_, value) {
							if (!value || value.length !== 19 || luhnCheck(value)) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('Not a valid credit card!'));
						},
					},
				]}
			>
				<Cleave
					className='ant-input'
					placeholder='XXXX XXXX XXXX XXXX'
					options={{ creditCard: true }}
				/>
			</Form.Item>

			<Form.Item
				name='exp'
				label='Expiry date'
				rules={[{ required: true, message: 'Expitaion deta is required!' }]}
			>
				<Cleave
					className='ant-input'
					placeholder='MM / YY'
					options={{
						date: true,
						dateMin: moment().format('YY-MM'),
						delimiter: ' / ',
						datePattern: ['m', 'y'],
					}}
				/>
			</Form.Item>

			<Form.Item
				name='cvv'
				label='CVV'
				rules={[
					{ required: true, message: 'CVV is required!' },
					{
						pattern: new RegExp(/\d{3,}/g),
						message: 'Value is not valid CVV!',
					},
				]}
			>
				<Input placeholder='XXX' minLength={3} maxLength={4} />
			</Form.Item>

			<Form.Item
				wrapperCol={{ xs: { offset: 0, span: 24 }, sm: { offset: 4, span: 16 } }}
			>
				<Button
					type='primary'
					htmlType='submit'
					size='large'
					style={{ marginRight: '4%', width: '48%' }}
				>
					Submit
				</Button>
				<Button
					htmlType='button'
					onClick={onReset}
					size='large'
					style={{ width: '48%' }}
				>
					Reset
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CardForm;
