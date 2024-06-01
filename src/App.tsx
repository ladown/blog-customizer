import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import type { ArticleStateType, OptionType } from './constants/articleProps';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultFormState,
} from './constants/articleProps';
import { Text } from './components/text/Text';
import { Separator } from './components/separator/Separator';
import { RadioGroup } from './components/radio-group/RadioGroup';
import { Select } from './components/select/Select';

import styles from './styles/index.module.scss';

export type TState = Record<keyof ArticleStateType, OptionType>;

export const App = () => {
	const [formOpenState, setFormOpenState] = useState<boolean>(false);
	const [articleState, setArticleState] = useState<TState>(defaultArticleState);
	const [formState, setFormState] = useState<Partial<TState>>(defaultFormState);

	const toggleOpenState = (): void => {
		setFormOpenState(!formOpenState);
	};

	const handleFormStateUpdate = (key: keyof ArticleStateType): ((selected: OptionType) => void) => {
		return (selected: OptionType) => {
			setFormState((ctx) => ({
				...ctx,
				[key]: selected,
			}));
		};
	};

	const handleParamsSubmit = (): void => {
		Object.keys(formState).forEach((formStateKey) => {
			setArticleState((ctx) => {
				return {
					...ctx,
					[formStateKey]: formState[formStateKey as keyof ArticleStateType],
				};
			});
		});
	};

	const handleReset = (): void => {
		setArticleState(defaultArticleState);
		setFormState(defaultFormState);
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
			}
		>
			<ArticleParamsForm
				isOpened={formOpenState}
				toggleOpenState={toggleOpenState}
				handleSubmit={handleParamsSubmit}
				handleReset={handleReset}
			>
				<Text as={'h2'} size={31} weight={800} uppercase={true}>
					Задайте параметры
				</Text>
				<Select
					title='шрифт'
					placeholder='Выберите шрифт'
					options={fontFamilyOptions}
					selected={formState?.fontFamilyOption || null}
					onChange={handleFormStateUpdate('fontFamilyOption')}
				/>
				<RadioGroup
					name='font-size'
					title='рАЗМЕР шрифта'
					options={fontSizeOptions}
					selected={formState?.fontSizeOption || fontSizeOptions[0]}
					onChange={handleFormStateUpdate('fontSizeOption')}
				/>
				<Select
					title='Цвет шрифта'
					placeholder='Выберите цвет шрифта'
					options={fontColors}
					selected={formState?.fontColor || null}
					onChange={handleFormStateUpdate('fontColor')}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					placeholder='Выберите цвет фона'
					options={backgroundColors}
					selected={formState?.backgroundColor || null}
					onChange={handleFormStateUpdate('backgroundColor')}
				/>
				<Select
					title='Ширина контента '
					placeholder='Выберите ширину контента'
					options={contentWidthArr}
					selected={formState?.contentWidth || null}
					onChange={handleFormStateUpdate('contentWidth')}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};
