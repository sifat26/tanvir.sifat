export type TAdmin = {
  _id?: string; name: string; email: string; password: string;
  isBlocked: boolean; mustChangePassword: boolean; createdAt?: Date; updatedAt?: Date;
};
export type TLoginAdmin = { email: string; password: string };
export type TLoginAdminResponse = {
  accessToken: string; mustChangePassword: boolean; adminData: Omit<TAdmin, 'password'>;
};
