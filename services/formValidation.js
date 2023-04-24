import * as constants from '@/shared/constants';

export const required = (errorMsg = '') => (v => !!v || (errorMsg || constants.validationRequiredMsg));
export const email = (errorMsg = '') => (v => /.+@.+\..+/.test(v) || (errorMsg || constants.validationEmailMsg));
