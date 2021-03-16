import { useTranslation } from 'react-i18next';

export interface TranslatableString {
    key: string;
    extra?: { [key: string]: unknown };
}

export interface Translator {
    translate(translatableString: TranslatableString): string;
}

export const useTranslator = (): Translator => {
    const { t } = useTranslation();

    const translate = (translatableString: TranslatableString): string => {
        return t(translatableString.key, translatableString.extra);
    };

    return { translate };
};
