
const invoiceForm = document.getElementById('invoice-form');

if ( document.body.contains(invoiceForm) ) {

    const formPrice = sessionStorage.getItem('checkout_price'),
        formCurrency = sessionStorage.getItem('checkout_currency');

    invoiceForm.price.value = formPrice;
    invoiceForm.currency.value = formCurrency;

    invoiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sessionStorage.setItem('checkout_price', e.target.price.value);
        sessionStorage.setItem('checkout_currency', e.target.currency.value);
        document.location.href = e.target.action;
    });
}