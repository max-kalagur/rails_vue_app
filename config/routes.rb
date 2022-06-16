Rails.application.routes.draw do
  get 'invoice', to: 'main#invoice'
  get 'payment-options', to: 'main#get_payment_options', :defaults => { :format => 'json' }
  get 'invoice-data', to: 'main#get_invoice_data', :defaults => { :format => 'json' }
  
  root "main#index"
end
