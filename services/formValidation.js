import * as constants from '@/shared/constants';

export const required = (errorMsg = '') => (v => !!v || (errorMsg || constants.validationRequiredMsg));
export const email = (errorMsg = '') => (v => /.+@.+\..+/.test(v) || (errorMsg || constants.validationEmailMsg));
export const passSpaces = (errorMsg = '') => (v => !/\s/g.test(v) || (errorMsg || constants.validationPassMsgSpaces));
export const passCyrillic = (errorMsg = '') => (v => !/[а-яА-Я]/g.test(v) || (errorMsg || constants.validationPassMsgCyrillic));
export const passLength = (errorMsg = '') => (v => v.length >= 8 || (errorMsg || constants.validationPassMsgLength));
export const passCapitalLetters = (errorMsg = '') => (v => /[A-Z]+/g.test(v) || (errorMsg || constants.validationPassMsgCapitalLetters));
export const passLowerCase = (errorMsg = '') => (v => /[a-z]+/g.test(v) || (errorMsg || constants.validationPassMsgLowerCase));
export const passSpecSymbols = (errorMsg = '') => (v => /[\W\d_]/g.test(v) || (errorMsg || constants.validationPassMsgSpecSymbols));
