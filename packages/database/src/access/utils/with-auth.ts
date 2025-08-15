import { IAuthenticationService } from '@sample/database/access/types/services/authentication.service.interface';
import { UnauthenticatedError } from '@sample/database/access/errors/auth';

export type RequireAuthOptions = {
  /**
   * If true, skip auth check entirely when no auth server is available.
   * Detection is based on either a missing service instance or the service throwing SampleAuthError.
   * Default: true
   */
  skipIfNoAuthServer?: boolean;
  /**
   * Custom error message when a user is required but not authenticated.
   * Default: 'Must be logged in to access this resource'
   */
  unauthenticatedMessage?: string;
};

/**
 * Performs a standard auth check used by controllers.
 * - If an auth server is unavailable (service missing or SampleAuthError), returns null and does NOT throw.
 * - If auth server exists but user is not authenticated, throws UnauthenticatedError with the provided message.
 * - If authenticated, returns the user object.
 */
export async function requireAuthenticatedUser(
  authenticationService: IAuthenticationService | undefined,
  options: RequireAuthOptions = {},
): Promise<any | null> {
  const {
    skipIfNoAuthServer = true,
    unauthenticatedMessage = 'Must be logged in to access this resource',
  } = options;

  // No auth service injected → treat as no auth server and skip
  if (!authenticationService) {
    return skipIfNoAuthServer ? null : (() => { throw new UnauthenticatedError(unauthenticatedMessage); })();
  }

  try {
    const status = await authenticationService.getUser();

    // If the service is present but signals unauthenticated, throw
    if (!status?.data?.user || status.error) {
      throw new UnauthenticatedError(unauthenticatedMessage);
    }

    return status.data.user;
  } catch (error) {
    // If the implementation indicates that no auth server is configured, skip
    if (skipIfNoAuthServer && error instanceof SampleAuthError) {
      return null;
    }

    // Re-throw other unexpected errors so callers can handle via withServiceError
    throw error;
  }
}

export type WithAuthGuardOptions = RequireAuthOptions & {
  /**
   * If true, pass the resolved user (or null) as the first argument to the action.
   * Default: false (action signature unchanged)
   */
  passUser?: boolean;
};

/**
 * Enforces authentication around a controller action.
 * Usage (require auth):
 *   const result = await withAuthGuard(authService, { passUser: true }, (_user, params) => { ... }, params);
 * Usage (optional auth, skip when server missing):
 *   const result = await withAuthGuard(authService, { requireUser: false }, (params) => { ... }, params);
 */
export async function withAuthGuard<Args extends any[], ReturnType, U = any>(
  authenticationService: IAuthenticationService | undefined,
  opts: WithAuthGuardOptions & { passUser: true },
  action: (user: U | null, ...args: Args) => Promise<ReturnType>,
): Promise<ReturnType>;

export async function withAuthGuard<Args extends any[], ReturnType>(
  authenticationService: IAuthenticationService | undefined,
  opts: WithAuthGuardOptions,
  action: (...args: Args) => Promise<ReturnType>,
): Promise<ReturnType>;

export async function withAuthGuard<Args extends any[], ReturnType>(
  authenticationService: IAuthenticationService | undefined,
  opts: WithAuthGuardOptions,
  action: (...args: any[]) => Promise<ReturnType>,
): Promise<ReturnType> {
  const { passUser = false, ...options } = opts;
  const user = await requireAuthenticatedUser(authenticationService, options);

  if (passUser) {
    return action(user);
  }

  return action();
}

