import { createElement, FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import t from './title.module.scss';

const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a'];
const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'];

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';

interface ITitle
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	element?: Element;
	size?: Size;
	text?: string;
	props?:
		| DetailedHTMLProps<
				HTMLAttributes<HTMLAnchorElement | HTMLHeadingElement>,
				HTMLAnchorElement | HTMLHeadingElement
		  >
		| any;
	children?: JSX.Element | string;
	className?: string;
}

const Title: FC<ITitle> = ({
	element = 'h1',
	size = 'xl',
	text = '',
	props = {},
	children,
	className = '',
	...rest
}) => {
	if (!elements.includes(element))
		throw new Error(`element should be one of: ${elements.toString()}`);
	if (!sizes.includes(size))
		throw new Error(`size should be one of: ${sizes.toString()}`);

	props.className = [t._text, props.className].join(' ');
	props['data-size'] = size;

	if (element === 'a') props = { href: 'javascript:void(0)', ...props };

	return (
		<div className={[t._root, className].join(' ')} {...rest}>
			{createElement(element, props, text)}
			{children}
		</div>
	);
};

export default Title;
