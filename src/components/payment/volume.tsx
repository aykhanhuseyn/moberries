import React from 'react';
import s from './payment.module.scss';
import { IValue } from '../../models';

interface IVolumeProps extends IValue {
	selected: boolean;
}

const Volume: React.FC<IVolumeProps> = ({ label, selected = false }) => {
	return (
		<div className={s[selected ? '_volume--selected' : '_volume']}>
			<span className={s._volume__value}>{label}</span>
		</div>
	);
};

export default Volume;
