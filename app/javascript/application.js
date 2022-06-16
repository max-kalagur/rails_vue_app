// Entry point for the build script in your package.json
// import "@hotwired/turbo-rails"
// import "./controllers"
import * as bootstrap from "bootstrap"
import { checkout } from "./apps/checkout/app"

// run Checkout form app
checkout.run()