import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [],
        line_items: req.body.map((item)=>{
          const {attributes, id, quantity} = item
                const {product_name, product_image, product_price, slug, category} = attributes;
                const {data} = product_image
                const {formats} = data.attributes
                const {large, medium, small} = formats;
              return{
                price_data:{
                  currency:'USD',
                  product_data:{
                    name: product_name,
                    images: ['http://localhost:1337' + small.url],
                  },
                  unit_amount: product_price * 100
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                },
                quantity: quantity
              }
          }),

          success_url: `${req.headers.origin}/studio`,
          cancel_url: `${req.headers.origin}/cart`,
        };
        console.log(res)
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      // res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}