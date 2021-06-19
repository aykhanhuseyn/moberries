import React from 'react';
import 'antd/dist/antd.css';
import './styles/App.module.scss';
import Layout from './components/layout';
import Home from './pages/home';

const App = () => {
	return (
		<Layout>
			<Home />
		</Layout>
	);
};

export default App;
