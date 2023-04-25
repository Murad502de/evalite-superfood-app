import * as constants from '@/shared/constants';

export const required = (errorMsg = '') => (v => !!v || (errorMsg || constants.validationRequiredMsg));
export const email = (errorMsg = '') => (v => /.+@.+\..+/.test(v) || (errorMsg || constants.validationEmailMsg));
export const numbers = (errorMsg = '') => (v => /^[0-9]*$/gm.test(v) || (errorMsg || constants.validationNumbersMsg));
export const date = (errorMsg = '') => (v => /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g.test(v) || (errorMsg || constants.validationDateMsg));
export const phoneRus = (errorMsg = '') => (v => /^\+7?[489][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/gm.test(v) || (errorMsg || constants.validationPhoneRusMsg));
export const passSpaces = (errorMsg = '') => (v => !/\s/g.test(v) || (errorMsg || constants.validationPassMsgSpaces));
export const passCyrillic = (errorMsg = '') => (v => !/[а-яА-Я]/g.test(v) || (errorMsg || constants.validationPassMsgCyrillic));
export const passLength = (errorMsg = '') => (v => v.length >= 8 || (errorMsg || constants.validationPassMsgLength));
export const passCapitalLetters = (errorMsg = '') => (v => /[A-Z]+/g.test(v) || (errorMsg || constants.validationPassMsgCapitalLetters));
export const passLowerCase = (errorMsg = '') => (v => /[a-z]+/g.test(v) || (errorMsg || constants.validationPassMsgLowerCase));
export const passSpecSymbols = (errorMsg = '') => (v => /[\W\d_]/g.test(v) || (errorMsg || constants.validationPassMsgSpecSymbols));
