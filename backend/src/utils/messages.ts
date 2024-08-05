const messages = {
  PROVIDE_EMAIL_PASSWORD: "Please provide both email and password",
  INVALID_EMAIL: "Invalid email address.",
  SHORT_PASSWORD: "Password must be at least 6 characters.",
  USER_EXISTS: "User already exists",
  SERVER_ERROR: "Server error.",
  USER_NOT_FOUND: "User not found. You need to signup first.",
  INVALID_EMAIL_PASSWORD: "Invalid email or password",
  PRODUCT_NOT_FOUND: "Product not found",
  ALL_FIELDS_REQUIRED: "All fields are required",
  PRODUCT_ID_REQUIRED: "Product ID is required",
  CART_EMPTY: "Cart is empty",
  CART_NOT_FOUND: "Cart not found",
  ITEM_NOT_FOUND_CART: "Item not found in cart",
  ITEM_REMOVED_CART: "Item removed from cart",
  CHECKOUT_SUCCESS: "Checkout successful",
  ORDER_CONFIRMATION: "Order Confirmation",
  CREATED: "Created Successful",
  FETCH: "Fetch Successful",
  UPDATE_SUCCESS: "Updated Successfully",
  ITEM_ADD_TO_CART: "Item Added To Cart",
  THANK_YOU_PURCHASE: (shippingAddress: string) =>
    `Thank you for your purchase! Your order has been successfully checked out and will be shipped to ${shippingAddress}.`,
};

export default messages;
