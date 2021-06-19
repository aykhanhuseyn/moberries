import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../shared/title';
import Cleave from 'cleave.js/react';
import moment from 'moment';
import s from '../payment/payment.module.scss';
import { setActiveTab, enableTab, disableTab } from '../../redux/slice';

const CardForm = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		console.log(values);
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
				style={{ margin: '10px 0 20px 20px' }}
			/>

			<Form.Item
				name='pan'
				label='Card Number'
				rules={[
					{ required: true, message: 'Card Number is required!' },
					{ len: 19, message: 'Card have to contain 16 symbols.' },
				]}
			>
				<Cleave
					className='ant-input'
					placeholder='XXXX XXXX XXXX XXXX'
					options={{ creditCard: true }}
					onChange={(event) => {
						console.log(event.target.rawValue, event.target.value);
					}}
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
					onChange={(event) => {
						console.log(event.target.rawValue, event.target.value);
					}}
				/>
			</Form.Item>

			<Form.Item
				name='cvv'
				label='CVV'
				rules={[
					{ required: true, message: 'CVV is required!' },
					{ pattern: new RegExp(/\d{3,4}/g), message: 'Value is not valid CVV!' },
					{ max: 4, message: 'CVV can not be longer than 4 chars!' },
					{ min: 3, message: 'CVV can not be less than 3 chars!' },
				]}
			>
				<Input placeholder='XXX' type='number' />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button
					type='primary'
					htmlType='submit'
					size='large'
					style={{ marginRight: '20px' }}
				>
					Submit
				</Button>
				<Button htmlType='button' onClick={onReset} size='large'>
					Reset
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CardForm;
