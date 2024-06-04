import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import type { ArticleStateType } from './constants/articleProps';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [formOpenState, setFormOpenState] = useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleOpenState = (): void => {
		setFormOpenState(!formOpenState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpened={formOpenState}
				toggleOpenState={toggleOpenState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
