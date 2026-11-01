import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const handleToggle = (): void => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      const panel = panelRef.current;

      if (panel && event.target instanceof Node && !panel.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={panelRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) => {
              setFormState((previousState) => ({
                ...previousState,
                fontFamilyOption: option,
              }));
            }}
          />
          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => {
              setFormState((previousState) => ({
                ...previousState,
                fontSizeOption: option,
              }));
            }}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) => {
              setFormState((previousState) => ({
                ...previousState,
                fontColor: option,
              }));
            }}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) => {
              setFormState((previousState) => ({
                ...previousState,
                backgroundColor: option,
              }));
            }}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) => {
              setFormState((previousState) => ({
                ...previousState,
                contentWidth: option,
              }));
            }}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
