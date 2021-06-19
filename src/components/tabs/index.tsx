import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEnabledTabs, getActiveTab, setActiveTab } from '../../redux/slice';
import { TabsPosition } from 'antd/lib/tabs';
import { ITab } from '../../models';
import Tabs from 'antd/lib/tabs';
import Title from '../shared/title';
import Payment from '../payment';
import CardForm from '../card';
import Total from '../total';

const tabs: Array<ITab> = [
	{
		tab: (
			<Title
				text='Select subscription parameters'
				element='span'
				size='sm'
				style={{ lineHeight: 1, margin: 0 }}
			/>
		),
		key: 'parameters',
		content: <Payment />,
	},
	{
		tab: (
			<Title
				text='Payment data'
				element='span'
				size='sm'
				style={{ lineHeight: 1, margin: 0 }}
			/>
		),
		key: 'creditcard',
		content: <CardForm />,
	},
	{
		tab: (
			<Title
				text='Confirmation'
				element='span'
				size='sm'
				style={{ lineHeight: 1, margin: 0 }}
			/>
		),
		key: 'confirm',
		content: <Total />,
	},
];

const TabList: FC = () => {
	const dispatch = useDispatch();
	const [tabPosition, setTabPosition] = useState<TabsPosition>('top');
	const enabledTabs = useSelector(getEnabledTabs);
	const activeTab = useSelector(getActiveTab);

	useEffect(() => {
		function handleResize() {
			process.env.NODE_ENV === 'development' && console.log(tabPosition, window.innerWidth);
			if (tabPosition !== 'left' && window.innerWidth > 996) {
				setTabPosition('left');
			}
			if (tabPosition !== 'top' && window.innerWidth <= 996) {
				setTabPosition('top');
			}
		}

		window.addEventListener('resize', handleResize);

		return document.removeEventListener('resize', handleResize);
	}, [tabPosition]);

	return (
		<Tabs
			tabPosition={tabPosition}
			activeKey={activeTab}
			onChange={(activekey) => {
				dispatch(setActiveTab(activekey));
			}}
		>
			{tabs.map((t, i) => (
				<Tabs.TabPane
					tab={t.tab}
					key={t.key || i}
					disabled={!enabledTabs.includes(t.key)}
				>
					{t.content}
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default TabList;
