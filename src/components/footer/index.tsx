import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getActiveTab } from '../../redux/slice';
import Total from '../total/amount';
import s from './footer.module.scss';

const Footer: FC = () => {
	const tab = useSelector(getActiveTab);
	return (
		<footer
			className={s._root}
			style={tab === 'confirm' ? { height: '50px' } : {}}
		>
			{tab !== 'confirm' && <Total />}
			<div className={s._container}>
				<span className={s._root__text}>
					Aniverse &copy; {new Date().getFullYear()} Created by Aykhan
				</span>
			</div>
		</footer>
	);
};

export default Footer;
