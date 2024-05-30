export interface IProducts {
  id: string;
  masterData: {
    current: ICurrentProduct;
    hasStagedChanges: boolean;
    published: boolean;
    staged: {
      categories: [
        {
          id: string;
          typeId: string;
        },
      ];
      description: {
        en: string;
      };
      masterVariant: {
        attributes: IProductAttributes[];
        id: number;
        images: IProductImages[];
        prices: [
          {
            value: {
              type: string;
              fractionDigits: number;
              centAmount: number;
              currencyCode: number;
            };
            id: string;
          },
        ];
        sku: string;
      };
      name: {
        en: string;
      };
      slug: {
        en: string;
      };
      variants: IProductVariants[];
      searchKeywords: object;
    };
  };
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  version: number;
  createdAt: string;
  lastModifiedAt: string;
}

export interface IQueryProducts {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IProducts[];
}

export interface ICurrentProduct {
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  categories: [
    {
      id: string;
      typeId: string;
    },
  ];
  slug: {
    en: string;
  };
  masterVariant: IMasterVariant;
  variants: IProductVariants[];
  searchKeywords: object;
}

export interface IMasterVariant {
  id: number;
  sku: string;
  prices: [
    {
      id: string;
      value: {
        type: string;
        fractionDigits: number;
        centAmount: number;
        currencyCode: string;
      };
      discounted: {
        value: {
          type: string;
          fractionDigits: number;
          centAmount: number;
          currencyCode: string;
        };
      };
    },
    {
      id: string;
      value: {
        type: string;
        fractionDigits: number;
        centAmount: number;
        currencyCode: string;
      };
      discounted: {
        value: {
          type: string;
          fractionDigits: number;
          centAmount: number;
          currencyCode: string;
        };
      };
    },
  ];
  images: IProductImages[];
  attributes: IProductAttributes[];
}

export interface IProductImages {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

export interface IProductAttributes {
  name: string;
  value: string;
}

export interface IProductVariants {
  assets: [];
  attributes: IProductAttributes[];
  id: number;
  images: [];
  key: string;
  prices: [];
  sku: string;
}