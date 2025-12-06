import { Injectable } from '@angular/core';
import {
  AuthenticatedUser,
  configureAuth,
  getAccessToken,
  getUser,
  isAuthenticated,
  login,
  logout,
} from '@pol/auth-core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  configure = configureAuth;
  login = login;
  logout = logout;
  isAuthenticated = isAuthenticated;
  getAccessToken = getAccessToken;
  getUser = getUser;
}
