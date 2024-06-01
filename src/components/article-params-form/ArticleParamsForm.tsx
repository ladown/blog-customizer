import clsx from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';

import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';

import styles from './ArticleParamsForm.module.scss';

type IArticleParamsFormProps = {
	children?: ReactNode;
	isOpened?: boolean;
	toggleOpenState?: () => void;
	handleReset?: () => void;
	handleSubmit?: () => void;
};

export const ArticleParamsForm = ({
	isOpened,
	toggleOpenState,
	children,
	handleSubmit,
	handleReset,
}: IArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpened) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const pathTree = event.composedPath();

			if (rootRef.current && !pathTree.includes(rootRef.current)) {
				toggleOpenState?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleOpenState?.();
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpened, toggleOpenState]);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		handleSubmit?.();
	};

	return (
		<>
			<ArrowButton isOpened={isOpened} onClick={toggleOpenState} />
			<aside ref={rootRef} className={clsx(styles.container, isOpened && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={handleReset}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
