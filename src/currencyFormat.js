export const currencyFormat = (val) => new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(val);