Rails.application.routes.draw do
  get 'invoice', to: 'main#invoice'
  get 'payment-options', to: 'main#get_payment_options', :defaults => { :format => 'json' }
  
  root "main#index"
end
