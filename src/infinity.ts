/**
 * Represents an item in the checkout process.
 * @interface Item
 */
interface Item {
  /** The name of the item */
  name: string;
  /** The price of the item */
  price: number;
  /** The quantity of the item */
  quantity: number;
}

/**
 * Customer information for the checkout process.
 * @interface CustomerInfo
 */
interface CustomerInfo {
  /** The name of the customer */
  customer_name?: string;
  /** The email of the customer */
  customer_email?: string;
  /** The cellphone number of the customer */
  customer_cellphone?: string;
  /** The CEP (postal code) of the customer's address */
  address_cep?: string;
  /** Additional address information */
  address_complement?: string;
  /** The street number of the customer's address */
  address_number?: string;
}

/**
 * Parameters required to build the checkout URL.
 * @interface BuildUrlParams
 */
interface BuildUrlParams {
  /** Array of items to be purchased */
  items: Item[];
  /** Unique order identifier */
  order_nsu: string;
  /** URL to redirect to after checkout completion */
  redirect_url: string;
  /** Optional customer information */
  customer?: CustomerInfo;
}

/**
 * Main class for interacting with the Infinity Pay checkout system.
 * @class InfinityJS
 */
export class InfinityJS {
  /** Base URL for the Infinity Pay checkout system */
  private BASE_URL = "https://checkout.infinitepay.io";

  /**
   * Creates an instance of InfinityJS.
   * @param {string} handle - The merchant handle for authentication
   */
  constructor(private readonly handle: string) {}

  /**
   * Builds a URL for the Infinity Pay checkout process.
   * @param {BuildUrlParams} params - Parameters for building the checkout URL
   * @returns {string} The complete checkout URL
   */
  buildUrl(params: BuildUrlParams): string {
    const { items, order_nsu, redirect_url, customer } = params;

    // Encode items as JSON and then URL encode
    const encodedItems = encodeURIComponent(JSON.stringify(items));

    // Build the base URL with required parameters
    let url = `${this.BASE_URL}/${
      this.handle
    }?items=${encodedItems}&order_nsu=${order_nsu}&redirect_url=${encodeURIComponent(
      redirect_url
    )}`;

    // Add customer information if provided
    if (customer) {
      if (customer.customer_name) {
        url += `&customer_name=${encodeURIComponent(customer.customer_name)}`;
      }
      if (customer.customer_email) {
        url += `&customer_email=${encodeURIComponent(customer.customer_email)}`;
      }
      if (customer.customer_cellphone) {
        url += `&customer_cellphone=${encodeURIComponent(
          customer.customer_cellphone
        )}`;
      }
      if (customer.address_cep) {
        url += `&address_cep=${encodeURIComponent(customer.address_cep)}`;
      }
      if (customer.address_complement) {
        url += `&address_complement=${encodeURIComponent(
          customer.address_complement
        )}`;
      }
      if (customer.address_number) {
        url += `&address_number=${encodeURIComponent(customer.address_number)}`;
      }
    }

    return url;
  }
}
