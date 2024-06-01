import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';

import styles from './ArticleParamsForm.module.scss';

type IArticleParamsFormProps = {
	isOpened: boolean;
	toggleOpenState: () => void;
};

export const ArticleParamsForm = ({ isOpened, toggleOpenState }: IArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const pathTree = event.composedPath();

			if (isOpened && rootRef.current && !pathTree.includes(rootRef.current)) {
				toggleOpenState();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpened]);

	return (
		<>
			<ArrowButton isOpened={isOpened} onClick={toggleOpenState} />
			<aside ref={rootRef} className={clsx(styles.container, isOpened && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
