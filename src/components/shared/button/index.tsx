import React, { FC, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import button from './button.module.scss';

const types = ['primary', 'secondary', 'link', 'multi'];
const sizes = ['default', 'small', 'large', 'full', 'fullstart'];

type TSize = 'default' | 'small' | 'large' | 'full' | 'fullstart';
type TType = 'primary' | 'secondary' | 'link' | 'multi';
type TButtonType = 'button' | 'submit' | 'reset' | undefined;

interface IRootButtonProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	className?: string;
	type?: TButtonType;
	children?: string | Element | ReactNode;
}

interface IButtonProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	type?: TType;
	size?: TSize;
	htmlType?: TButtonType;
	className?: string;
	children?: string | Element | ReactNode;
}

const getTypeClass = (type: TType): string =>
	types.includes(type) ? `_${type}` : '_primary';
const getSizeClass = (size: TSize): string =>
	sizes.includes(size) ? `_${size}` : '_default';

const RootButton: FC<IRootButtonProps> = ({
	type,
	className,
	children,
	...rest
}) => (
	<button type={type} className={className} {...rest}>
		{children}
	</button>
);

const Button: FC<IButtonProps> = ({
	type = 'primary',
	size = 'default',
	htmlType = 'button',
	className = '',
	children = '',
	onClick = () => null,
	...rest
}) => {
	return (
		<RootButton
			type={htmlType}
			onClick={onClick}
			className={[
				button[getTypeClass(type)],
				button[getSizeClass(size)],
				className,
			].join(' ')}
			{...rest}
		>
			{children}
		</RootButton>
	);
};

export default Button;
