import { FC } from 'react';
import Header from '../header';
import Footer from '../footer';

const Layout: FC = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<div className='container'>{children}</div>
			</main>
			<Footer />
		</>
	);
};

export default Layout;
