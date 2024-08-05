// defined here (and imported in components) as a workaround because env variables with blank strings interpreted as literal 'undefined' https://github.com/vercel/next.js/issues/64832

export const BASE_URL = process.env.NODE_ENV !== 'production' ? '' : '/admin-portal';
