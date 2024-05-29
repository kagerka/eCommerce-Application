export interface IProducts {
  id: string;
  masterData: {
    current: {
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
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
        price: [
          {
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
      variants: [];
      searchKeywords: object;
    };
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
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
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
      variants: [];
      attributes: [];
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

export interface ICategories {
  results(results: string): string;
  id: string;
  version: number;
  name: {
    en: string;
  };
  slug: {
    en: string;
  };
  parent: {
    typeId: string;
    id: string;
  };
  ancestors: [];
  orderHint: string;
  createdAt: string;
  lastModifiedAt: string;
}
