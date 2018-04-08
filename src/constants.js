export const API_ROOT = 'Your backend server API IP:PORT';// Need update
export const TOKEN_KEY = '';
//  https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
export const GEO_OPTIONS= {
    enableHighAccuracy: false,
    maximumAge        : 3600000, // milliseconds a possible cached position to return. set 0 means not use cache, always try to retrieve real current position
    timeout           : 27000  // milliseconds the device is allowed to take in order to return a position
};
export const POS_KEY = 'POS_KEY';
export  const AUTH_PREFIX = 'Bearer';