# @infinitepay/js

SDK JavaScript para integração com o InfinitePay Checkout.

## Instalação

```bash
npm install @infinitepay/js
```

## Uso

```typescript
import { InfinityJS } from "@infinitepay/js";

const infinity = new InfinityJS("seu-handle");

const url = infinity.buildUrl({
  items: [{ name: "Produto 1", price: 1000, quantity: 1 }],
  order_nsu: "123456",
  redirect_url: "https://seusite.com/sucesso",
  customer: {
    customer_name: "João Silva",
    customer_email: "joao@email.com",
  },
});
```

## Documentação

Para mais informações, visite [a documentação oficial](https://www.infinitepay.io/checkout).
