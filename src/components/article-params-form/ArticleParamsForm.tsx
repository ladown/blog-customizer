import clsx from 'clsx';
import { useState, useRef } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import type {
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import { Text } from 'components/text/Text';
import { Separator } from 'components/separator/Separator';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Select } from 'components/select/Select';
import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';

import { useCloseOnOverlay } from '../../hooks/useCloseOnOverlay';

import styles from './ArticleParamsForm.module.scss';

type IArticleParamsFormProps = {
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: IArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleOpenState = (): void => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFormStateUpdate = (
		selectedKey: keyof ArticleStateType
	): ((selected: OptionType) => void) => {
		return (selected: OptionType) => {
			setFormState((state) => ({
				...state,
				[selectedKey]: selected,
			}));
		};
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		setArticleState(formState);
	};

	const handleReset = (): void => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	useCloseOnOverlay({ rootRef, isOpened: isFormOpen, toggleOpenState });

	return (
		<div ref={rootRef}>
			<ArrowButton isOpened={isFormOpen} onClick={toggleOpenState} />
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFormStateUpdate('fontFamilyOption')}
					/>
					<RadioGroup
						name='radio'
						title='рАЗМЕР шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFormStateUpdate('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFormStateUpdate('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleFormStateUpdate('backgroundColor')}
					/>
					<Select
						title='Ширина контента '
						placeholder='Выберите ширину контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleFormStateUpdate('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
