import clsx from 'clsx';

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { MouseEvent } from 'react';

export type TArrowButtonProps = {
	onClick?: () => void;
	isOpened?: boolean;
};

export const ArrowButton = ({ onClick, isOpened }: TArrowButtonProps) => {
	const handleClick = (event: MouseEvent) => {
		event.stopPropagation();
		onClick?.();
	};
	return (
		<button
			className={clsx(styles.container, isOpened && styles.container_open)}
			onClick={handleClick}
			aria-label='Открыть/Закрыть форму параметров статьи'>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpened && styles.arrow_open)}
			/>
		</button>
	);
};
