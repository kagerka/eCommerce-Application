interface ITokenPassword {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export default ITokenPassword;
