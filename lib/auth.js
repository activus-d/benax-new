import Router from 'next/router';
import Cookies from 'js-cookie';
import { fetcher } from './api';

/**
 * setToken
 * @param {object} userDetails 
 * @returns sets the json web token retrieved upon loggin in to cookies 
 */
export const setToken = (userDetails) => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.set('username', userDetails.username);
  Cookies.set('jwt', userDetails.jwt);
  Cookies.set('email', userDetails.email)

  if (Cookies.get('username')) {
    
  }
};

/**
 * unsetToken
 * @returns removes token set to cookies upon logging out
 */
export const unsetToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.remove('jwt');
  Cookies.remove('username');
  Cookies.remove('email')

  Router.push('/');
};

export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.username;
      })
      .catch((error) => console.error(error));
  } else {
    return;
  }
};

export const getIdFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((data) => {
      return data.id;
    });
  } else {
    return;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
};

export const getEmailFromLocalCookie = () => {
  return Cookies.get('email');
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || '') {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwt;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || '') {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('id='));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split('=')[1];
  return id;
};