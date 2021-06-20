import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';

const App = () => {
	return (
		<Router basename={'/moberries'}>
			<Layout>
				<Switch>
					<Route path='/' component={Home} />
				</Switch>
			</Layout>
		</Router>
	);
};

export default App;
