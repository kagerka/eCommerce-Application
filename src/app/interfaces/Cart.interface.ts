type TCartState = 'Active' | 'Merged' | 'Ordered' | 'Frozen';
type TCartOrigin = 'Customer' | 'Merchant' | 'Quote';
type TTaxMode = 'Platform' | 'External' | 'ExternalAmount' | 'Disabled';
type TRoundingMode = 'HalfEven' | 'HalfUp' | 'HalfDown';
type TTaxCalculationMode = 'LineItemLevel' | 'UnitPriceLevel';
type TInventoryMode = 'None' | 'TrackOnly' | 'ReserveOnOrder';
type TShippingMode = 'Single' | 'Multiple';

type Url = { url: string };

export interface ICart {
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
  lineItems: ILineItem[];
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

export interface ILineItem {
  id: string;
  productId: string;
  name: {
    en: string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  productSlug: {
    en: string;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: [
      {
        id: string;
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
      },
    ];
    images: Url[];
    attributes: [];
    assets: [];
  };
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
  quantity: number;
  discountedPricePerQuantity: [];
  perMethodTaxRate: [];
  addedAt: string;
  lastModifiedAt: string;
  state: [
    {
      quantity: number;
      state: {
        typeId: string;
        id: string;
      };
    },
  ];
  priceMode: string;
  lineItemMode: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  taxedPricePortions: [];
}
