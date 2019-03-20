export const {
  AUTH_TOKEN,
  API_HOST,
  CANCEL_PATH,
  SEGMENT_ID,
  TIME_ZONE
} = window.Segments.config;

export const URL_TABLES_BLUEPRINT = `${API_HOST}/segments/criteria`;
export const URL_GET_PAYLOAD = `${API_HOST}/segments/show`;
export const URL_POST_PAYLOAD = `${API_HOST}/segments/detail`;
export const URL_COUNTER = `${API_HOST}/segments/counts`;
export const URL_SUGGESTIONS = `${API_HOST}/segments/related`;
export const URL_SEGMENT_CATEGORIES = `${API_HOST}/segments/groups`;
