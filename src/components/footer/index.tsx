import React, { FC } from 'react';
import Total from '../total';
import s from './footer.module.scss';

const Footer: FC = () => {
	return (
		<footer className={s._root}>
			<Total />
			<div className={s._container}>
				<span className={s._root__text}>
					Aniverse &copy; {new Date().getFullYear()} Created by Aykhan
				</span>
			</div>
		</footer>
	);
};

export default Footer;
