import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';

import styles from './ArticleParamsForm.module.scss';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import {useOutsideClickClose} from "components/select/hooks/useOutsideClickClose";

type TArticleParamsForm = {
	state: ArticleStateType;
	setState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({state, setState}: TArticleParamsForm) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		state.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		state.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		state.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(state.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		state.contentWidth
	);

	const handleShowSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const sidebarStyle = clsx(styles.container, {
		[styles.container_open]: showSidebar,
	});

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handleShowSidebar();
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [ref.current]);

	return (
		<div ref={ref}>
			<ArrowButton onClick={handleShowSidebar} isOpen={showSidebar} />
			{showSidebar && (
				<aside className={sidebarStyle}>
					<form className={styles.form}>
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
			)}
		</div>
	);
};
