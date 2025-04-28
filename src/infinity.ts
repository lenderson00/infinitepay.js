interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  customer_name?: string;
  customer_email?: string;
  customer_cellphone?: string;
  address_cep?: string;
  address_complement?: string;
  address_number?: string;
}

interface BuildUrlParams {
  items: Item[];
  order_nsu: string;
  redirect_url: string;
  customer?: CustomerInfo;
}

export class InfinityJS {
  private BASE_URL = "https://checkout.infinitepay.io";

  constructor(private readonly handle: string) {}

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
