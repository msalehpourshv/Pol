export interface AuthConfig {
  authority: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri?: string;
  scope?: string;
}

export interface AuthenticatedUser {
  sub: string;
  name: string;
  email?: string;
  roles: string[];
  companyId?: string;
  factoryId?: string;
}

let authConfig: AuthConfig | null = null;
let currentUser: AuthenticatedUser | null = null;
let token: string | null = null;

export function configureAuth(config: AuthConfig) {
  authConfig = config;
}

export function login(redirectPath?: string) {
  currentUser = {
    sub: 'demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    roles: ['user'],
  };
  token = 'fake-jwt-token';
  if (redirectPath) {
    window.location.assign(redirectPath);
  }
}

export function logout() {
  currentUser = null;
  token = null;
  if (authConfig?.postLogoutRedirectUri) {
    window.location.assign(authConfig.postLogoutRedirectUri);
  }
}

export function isAuthenticated(): boolean {
  return !!currentUser;
}

export async function getAccessToken(): Promise<string | null> {
  return token;
}

export function getUser(): AuthenticatedUser | null {
  return currentUser;
}
