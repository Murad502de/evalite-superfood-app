export const required = (errorMsg = '') => (v => !!v || errorMsg);
export const email = (errorMsg = '') => (v => /.+@.+\..+/.test(v) || errorMsg);
