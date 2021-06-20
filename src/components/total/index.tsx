import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, notification } from 'antd';
import {
	getParameters,
	getCard,
	setEmail,
	submitSubscription,
	getStatus,
	getMessage,
	resetState,
	setActiveTab,
} from '../../redux/slice';
import Title from '../shared/title';
import Amount from './amount';
import s from './total.module.scss';

const TotalPage = () => {
	const dispatch = useDispatch();
	const params = useSelector(getParameters);
	const card = useSelector(getCard);
	const status = useSelector(getStatus);
	const message = useSelector(getMessage);
	const [requesting, setRequesting] = useState(false);

	const handleSubmit = async (values: { email: string }) => {
		process.env.NODE_ENV === 'development' && console.log(values);
		await dispatch(setEmail(values.email));
		dispatch(submitSubscription({ ...params, ...card, email: values.email }));
		setRequesting(true);
	};

	useEffect(() => {
		if (requesting && status !== 'loading') {
			setRequesting(false);
			if (status === 'error') {
				notification.error({ message });
			} else {
				notification.success({ message: 'Payment successful.' });
				dispatch(setActiveTab('parameters'));
				// dispatch(resetState());
				// todo reset state
			}
		}
	}, [requesting, status, message, dispatch]);

	return (
		<>
			<Title
				className={s._title}
				text='Add your email to confirm payment.'
				element='h4'
				size='md'
			/>
			<Amount />

			<Form layout='vertical' onFinish={handleSubmit}>
				<Form.Item
					className={s._form}
					style={{ margin: '0 auto' }}
					label='Email'
					name='email'
					rules={[
						{ type: 'email', message: 'Email format is not correct!' },
						{ required: true, message: 'Email is required!' },
					]}
				>
					<Form.Item>
						<Input.Group compact style={{ display: 'flex' }}>
							<Input />
							<Button type='primary' htmlType='submit' style={{ height: '50px' }}>
								Submit
							</Button>
						</Input.Group>
					</Form.Item>
				</Form.Item>
			</Form>
		</>
	);
};

export default TotalPage;
