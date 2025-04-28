/**
 * Representa um item no processo de checkout.
 * @interface Item
 */
interface Item {
  /** Nome do item */
  name: string;
  /** Preço do item */
  price: number;
  /** Quantidade do item */
  quantity: number;
}

/**
 * Informações do cliente para o processo de checkout.
 * @interface CustomerInfo
 */
interface CustomerInfo {
  /** Nome do cliente */
  customer_name?: string;
  /** Email do cliente */
  customer_email?: string;
  /** Número de celular do cliente */
  customer_cellphone?: string;
  /** CEP do endereço do cliente */
  address_cep?: string;
  /** Informações complementares do endereço */
  address_complement?: string;
  /** Número do endereço do cliente */
  address_number?: string;
}

/**
 * Parâmetros necessários para construir a URL de checkout.
 * @interface BuildUrlParams
 */
interface BuildUrlParams {
  /** Array de itens a serem comprados */
  items: Item[];
  /** Identificador único do pedido */
  order_nsu: string;
  /** URL para redirecionamento após a conclusão do checkout */
  redirect_url: string;
  /** Informações opcionais do cliente */
  customer?: CustomerInfo;
}

/**
 * Classe principal para interação com o sistema de checkout Infinity Pay.
 * @class InfinityJS
 */
export class InfinityJS {
  /** URL base para o sistema de checkout Infinity Pay */
  private BASE_URL = "https://checkout.infinitepay.io";

  /**
   * Cria uma instância de InfinityJS.
   * @param {string} handle - O identificador do comerciante para autenticação "infiniteTag"
   */
  constructor(private readonly handle: string) {}

  /**
   * Constrói uma URL para o processo de checkout do Infinity Pay.
   * @param {BuildUrlParams} params - Parâmetros para construir a URL de checkout
   * @returns {string} A URL completa de checkout
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
