import cryptoRandomString from 'crypto-random-string';
// import { v4 as uuidv4 } from 'uuid';

export const generateStandId = (): string => {
  return cryptoRandomString({ length: 16, type: 'url-safe' });
};

// export const generateUUID = (): string => {
//   return uuidv4();
// };
