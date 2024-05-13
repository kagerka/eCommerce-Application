interface IAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export default IAccessToken;
