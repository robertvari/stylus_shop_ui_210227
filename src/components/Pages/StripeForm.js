import React, {useContext} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import {UserContext} from "../contexts/UserContext";
import axios from "axios";
import {useHistory} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

function StripeForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory()

  const {count, shopping_list, set_shopping_list, total} = useContext(ShoppingCartContext)
  const {
        first_name,
        last_name,
        company,
        address,
        apartment,
        city,
        post_code,
        phone,
        email,
        user_id
  } = useContext(UserContext)

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details : {
        name: first_name + " " + last_name,
        email: email,
        phone: phone,
        address: {
          city: city,
          country: "HU",
          postal_code: post_code,
          line1: address
        }
      }
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const {id} = paymentMethod

      const res = await axios({
            method: "post",
            url: `${API_URL}/api/shop/order/`,
            data: {
                payment_id: id,
                amount: total * 100,
                shopping_list: shopping_list,

                customer: {
                    user_id: user_id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    company:company,
                    address: address,
                    apartment: apartment,
                    city: city,
                    post_code: post_code,
                    phone:phone
                }
            }
        })

      if(res.data.status === "succeeded"){
        set_shopping_list([])
        localStorage.setItem("shopping_list", JSON.stringify([]))
        history.push("/payment_success")
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{hidePostalCode: true}}/>
      <button type="submit" disabled={!stripe}>
        <i className="far fa-credit-card"/>
        Check out
      </button>
    </form>
  );
}

export default StripeForm;