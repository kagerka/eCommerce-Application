import IUpdateAddress from './UpdateAddress.interface';

interface ICustomerUpdateRequest {
  id: string;
  token: string;
  version: number;
  address: IUpdateAddress;
}

export default ICustomerUpdateRequest;
