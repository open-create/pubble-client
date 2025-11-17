export const AUTH_STORAGE_KEY = 'pubble:auth-state';
export const AUTH_CHANGE_EVENT = 'pubble-auth-change';

const safeWindow = () => (typeof window === 'undefined' ? null : window);

export function markUserAuthenticated() {
  const targetWindow = safeWindow();
  if (!targetWindow) return;

  targetWindow.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  targetWindow.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearAuthState() {
  const targetWindow = safeWindow();
  if (!targetWindow) return;

  targetWindow.localStorage.removeItem(AUTH_STORAGE_KEY);
  targetWindow.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function isUserAuthenticated() {
  const targetWindow = safeWindow();

  if (!targetWindow) {
    return false;
  }

  return targetWindow.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}
