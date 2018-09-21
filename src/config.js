import env from '../env';

export const AUTH_TOKEN = env.AUTH_TOKEN;
export const URL_TABLES_BLUEPRINT = `${env.API_HOST}/api/v1/segments/criteria`;
export const URL_GET_PAYLOAD = `${env.API_HOST}/api/v1/segments/show`;
export const URL_POST_PAYLOAD = `${env.API_HOST}/api/v1/segments/detail`;
export const URL_COUNTER = `${env.API_HOST}/api/v1/segments/counts`;
export const URL_SUGGESTIONS = `${env.API_HOST}/api/v1/segments/related`;
export const URL_SEGMENT_CATEGORIES = `${env.API_HOST}/api/v1/segments/groups`;
export const GROUP_ID = 7;
// export const SEGMENT_ID = 252;
export const SEGMENT_ID = null;
