import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
	getParameters,
	getCard,
	setEmail,
	submitSubscription,
} from '../../redux/slice';
import Amount from './amount';

const TotalPage = () => {
	const dispatch = useDispatch();
	const params = useSelector(getParameters);
	const card = useSelector(getCard);

	const handleSubmit = async (values: { email: string }) => {
		process.env.NODE_ENV === 'development' && console.log(values);
		await dispatch(setEmail(values.email));
		dispatch(submitSubscription({ ...params, ...card, email: values.email }));
	};

	return (
		<>
			<Amount />
			<Form layout='vertical' onFinish={handleSubmit}>
				<Form.Item
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
