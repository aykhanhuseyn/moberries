import { FC } from 'react';
import { useSelector } from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import { getActiveTab } from '../../redux/slice';

const Layout: FC = ({ children }) => {
	const tab = useSelector(getActiveTab);
	return (
		<>
			<Header />
			<main style={tab === 'confirm' ? { minHeight: 'calc(100vh - 120px)' } : {}}>
				<div className='container'>{children}</div>
			</main>
			<Footer />
		</>
	);
};

export default Layout;
