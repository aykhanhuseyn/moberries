import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPrices } from '../redux/slice';
import TabList from '../components/tabs';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPrices());
	}, []);

	return <TabList />;
};

export default Home;
