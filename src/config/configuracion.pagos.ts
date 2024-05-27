export namespace ConfiguracionPagos {
  export const urlEpayco: string = "https://sandbox.api.epayco.co/v1/payment/create";
  export const privateKey = process.env.PUBLIC_KEY;
  export const apiKey = process.env.PRIVATE_KEY;
  export const tokenEpayco = process.env.TOKEN_EPAYCO;
}

