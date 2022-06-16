class MainController < ApplicationController
  def index
    @currencies = Rails.configuration.payment_options['currencies']
  end

  def invoice
  end

  def get_invoice_data
    render json: { price: 276, currency: 'USD' }, status: :ok
  end

  def get_payment_options
    options = Rails.configuration.payment_options

    if options
      render json: options, status: :ok
    else
      render json: { errors: 'Empty `currencies` and `payment_options`' }, status: :unprocessable_entity
    end
  end
  
end
