export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType?: string;
  availableForSale?: boolean;
  priceRange: {
    minVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  options?: Array<{
    name: string;
    values: string[];
  }>;
  tags?: string[];
  vendor?: string;
  createdAt?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orders?: {
    edges: Array<{
      node: Order;
    }>;
  };
}

export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  currentTotalPrice: Money;
}

export interface CustomerCreateInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

export interface CustomerAccessTokenCreateInput {
  email: string;
  password: string;
}
