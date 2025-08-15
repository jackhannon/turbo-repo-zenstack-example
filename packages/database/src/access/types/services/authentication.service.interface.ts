export interface IAuthenticationService {
  getUser(): Promise<{ data: { user: any }; error: boolean }>;
}
