<script setup>
import { StripeElement, StripeElements } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { onBeforeMount, ref } from "vue";

const stripeKey = ref(import.meta.env.VITE_STRIPE_PK); // test key
const clientSecret = ref();
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
});

const appearance = {
  theme: "stripe",
};
const elementsOptions = ref({
  clientSecret: clientSecret.value,
  appearance,

  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
});

const style = {
  base: {
    fontWeight: "500",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#87BBFD",
    },
  },
  invalid: {
    color: "#FFC7EE",
  },
};
const cardOptions = ref({
  style,
});
const stripeLoaded = ref(false);
const card = ref();
const elms = ref();

onBeforeMount(async () => {
  const stripePromise = loadStripe(stripeKey.value);
  stripePromise.then(() => {
    stripeLoaded.value = true;
  });

  const jwt = window.localStorage.getItem("jwt");

  const response = await fetch(`${import.meta.env.VITE_API_URI}/checkout`, {
    method: "POST",
    mode: "cors",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });

  const json = await response.json();
  clientSecret.value = json.clientSecret;
});

const pay = () => {
  // Get stripe element
  const cardElement = card.value.stripeElement;

  // Access instance methods, e.g. createToken()
  elms.value.instance.createToken(cardElement).then((result) => {
    // Handle result.error or result.token
    console.log(result);
  });
};
</script>

<template>
  <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements, instance }"
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
    <StripeElement
      type="card"
      ref="card"
      :elements="elements"
      :options="cardOptions"
    />
  </StripeElements>
  <button type="button" @click="pay">Pay</button>
</template>
