export const calcularAlertasRestock = () => {
    const todasLasFilas = document.querySelectorAll('.product-row');
    let nuevasAlertas = 0;

    todasLasFilas.forEach((fila) => {
    const celdaStock = fila.querySelector('.stock-cell');
    const stock = parseInt(celdaStock.getAttribute('data-stock'));
    const minimo = parseInt(celdaStock.getAttribute('data-min'));

    if (stock < minimo) {
    nuevasAlertas++;
    }
});

return nuevasAlertas;
};


export const stockColor = (stock, minimo) => {
    if (stock < minimo) return 'text-red-600';
    if (stock >= 5 && stock <= 9) return 'text-amber-500';
    return 'text-emerald-600';
};