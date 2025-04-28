import { describe, it, expect } from "vitest";

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

class InfinityJS {
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

describe("InfinityJS", () => {
  describe("buildUrl", () => {
    it("should build a basic URL with required parameters", () => {
      const infinity = new InfinityJS("cloudwalker");
      const params = {
        items: [{ name: "Produto 1", price: 1000, quantity: 1 }],
        order_nsu: "123456",
        redirect_url: "https://minhapagina.com/sucesso",
      };

      const url = infinity.buildUrl(params);
      // Verificar se a URL contém os componentes principais em vez de comparar a string exata
      expect(url).toContain("https://checkout.infinitepay.io/cloudwalker");
      expect(url).toContain("items=");
      expect(url).toContain("order_nsu=123456");
      expect(url).toContain(
        "redirect_url=https%3A%2F%2Fminhapagina.com%2Fsucesso"
      );
    });

    it("should build a URL with customer information", () => {
      const infinity = new InfinityJS("cloudwalker");
      const params = {
        items: [{ name: "Produto 1", price: 1000, quantity: 1 }],
        order_nsu: "123456",
        redirect_url: "https://minhapagina.com/sucesso",
        customer: {
          customer_name: "João Silva",
          customer_email: "joao.silva@email.com",
          customer_cellphone: "1199999-9999",
          address_cep: "99999999",
          address_complement: "Apto 504",
          address_number: "15a",
        },
      };

      const url = infinity.buildUrl(params);
      const decodedUrl = decodeURIComponent(url);
      // Verificar se a URL contém os parâmetros do cliente
      expect(decodedUrl).toContain("João Silva");
      expect(decodedUrl).toContain("joao.silva@email.com");
      expect(decodedUrl).toContain("1199999-9999");
      expect(decodedUrl).toContain("99999999");
      expect(decodedUrl).toContain("Apto 504");
      expect(decodedUrl).toContain("15a");
    });

    it("should handle multiple items in the cart", () => {
      const infinity = new InfinityJS("cloudwalker");
      const params = {
        items: [
          { name: "Produto 1", price: 1000, quantity: 1 },
          { name: "Produto 2", price: 2000, quantity: 2 },
        ],
        order_nsu: "123456",
        redirect_url: "https://minhapagina.com/sucesso",
      };

      const url = infinity.buildUrl(params);
      const decodedUrl = decodeURIComponent(url);
      // Verificar se a URL contém os itens
      expect(decodedUrl).toContain("Produto 1");
      expect(decodedUrl).toContain("Produto 2");
      expect(decodedUrl).toContain('"price":1000');
      expect(decodedUrl).toContain('"price":2000');
    });

    it("should handle partial customer information", () => {
      const infinity = new InfinityJS("cloudwalker");
      const params = {
        items: [{ name: "Produto 1", price: 1000, quantity: 1 }],
        order_nsu: "123456",
        redirect_url: "https://minhapagina.com/sucesso",
        customer: {
          customer_name: "João Silva",
          customer_email: "joao.silva@email.com",
        },
      };

      const url = infinity.buildUrl(params);
      const decodedUrl = decodeURIComponent(url);
      // Verificar se a URL contém os parâmetros do cliente
      expect(decodedUrl).toContain("João Silva");
      expect(decodedUrl).toContain("joao.silva@email.com");
      expect(url).not.toContain("customer_cellphone=");
      expect(url).not.toContain("address_cep=");
    });

    it("should handle special characters in parameters", () => {
      const infinity = new InfinityJS("cloudwalker");
      const params = {
        items: [{ name: "Produto & Especial", price: 1000, quantity: 1 }],
        order_nsu: "123456",
        redirect_url: "https://minhapagina.com/sucesso?param=valor&outro=teste",
        customer: {
          customer_name: "João & Maria",
          customer_email: "joao&maria@email.com",
        },
      };

      const url = infinity.buildUrl(params);
      const decodedUrl = decodeURIComponent(url);
      // Verificar se a URL contém os caracteres especiais
      expect(decodedUrl).toContain("Produto & Especial");
      expect(decodedUrl).toContain("João & Maria");
      expect(decodedUrl).toContain("joao&maria@email.com");
    });
  });
});
