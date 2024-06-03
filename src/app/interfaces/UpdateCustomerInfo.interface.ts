export type TActions = {
  action: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

export type TCustomerData = {
  customerID: string;
  version: number;
  newUserInfo: {
    newEmailAddress?: string;
    newFirstName?: string;
    newLastName?: string;
    newDateOfBirth?: string;
  };
};
