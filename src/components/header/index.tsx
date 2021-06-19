import React, { FC } from 'react';
import logo from '../../assets/logo.svg';
import style from './header.module.scss';

const Header: FC = () => {
	return (
		<header className={style._root}>
			<div className={style._container}>
				<div className={style._root__logo}>
					<img className={style._root__logo__img} src={logo} alt='logo' />
				</div>
				<h3 className={style._root__company}>Moberries</h3>
			</div>
		</header>
	);
};

export default Header;
