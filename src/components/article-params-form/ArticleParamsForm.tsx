import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import { Text } from 'components/text';

type TArticleParamsForm = {
	state: ArticleStateType;
	setState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [sidebarState, setSidebarState] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		props.state.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		props.state.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		props.state.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(props.state.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		props.state.contentWidth
	);

	const handleSidebarState = () => {
		setSidebarState(!sidebarState);
	};

	const sidebarStyle = clsx(styles.container, {
		[styles.container_open]: sidebarState,
	});

	useEffect(() => {
		if (!sidebarState) return;

		function handleOutsideClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setSidebarState(false);
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [ref.current]);

	const handleSubmit = (event: SyntheticEvent) => {
		event?.preventDefault();
		props.setState({
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	const handleReset = (event: SyntheticEvent) => {
		event?.preventDefault();
		props.setState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={ref}>
			<ArrowButton onClick={handleSidebarState} isOpen={sidebarState} />
			<aside className={sidebarStyle}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectedFont}
						onChange={setSelectedFont}
					/>

					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						name='size'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
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
