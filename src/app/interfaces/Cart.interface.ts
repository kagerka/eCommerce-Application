type TCartState = 'Active' | 'Merged' | 'Ordered' | 'Frozen';
type TCartOrigin = 'Customer' | 'Merchant' | 'Quote';
type TTaxMode = 'Platform' | 'External' | 'ExternalAmount' | 'Disabled';
type TRoundingMode = 'HalfEven' | 'HalfUp' | 'HalfDown';
type TTaxCalculationMode = 'LineItemLevel' | 'UnitPriceLevel';
type TInventoryMode = 'None' | 'TrackOnly' | 'ReserveOnOrder';
type TShippingMode = 'Single' | 'Multiple';

interface ICart {
  type: string;
  id: string;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: {
    isPlatformClient: boolean;
  };
  lineItems: [];
  cartState: TCartState;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: TShippingMode;
  shipping: [];
  customLineItems: [];
  discountCodes: [];
  directDiscounts: [];
  inventoryMode: TInventoryMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxCalculationMode: TTaxCalculationMode;
  refusedGifts: [];
  origin: TCartOrigin;
  itemShippingAddresses: [];
}

export default ICart;
