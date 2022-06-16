
const invoiceForm = document.getElementById('invoice-form');

if ( document.body.contains(invoiceForm) ) {

    let formPrice = localStorage.getItem('checkout_price'),
        formCurrency = localStorage.getItem('checkout_currency') ?? invoiceForm.currency.value;

    // Save invoice data handler
    const saveInvoiceData = (sessionKey, value) => {
        !!value ? localStorage.setItem(sessionKey, value) : localStorage.removeItem(sessionKey);
        // to inform current tab
        window.dispatchEvent(new StorageEvent('storage', {
            key: sessionKey, 
            newValue: value
        }));    
    };

    // Update Form if we have data in localStorage
    if( formPrice ) {
        invoiceForm.price.value = formPrice;
    }
    if( formCurrency ) {
        invoiceForm.currency.value = formCurrency;
        // If no currency in localStorage - set default form value
        if( !localStorage.getItem('checkout_currency') ) {
            saveInvoiceData( 'checkout_currency', formCurrency );
        }
    }
    
    // Save invoice data events
    invoiceForm.price.addEventListener('keyup', (e) => saveInvoiceData( 'checkout_price', e.target.value ));
    invoiceForm.currency.addEventListener('change', (e) => saveInvoiceData( 'checkout_currency', e.target.value ));
}