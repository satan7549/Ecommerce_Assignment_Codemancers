# NodeJS Ecommerce Project

This project is an eCommerce application where users can log in, manage products, and handle carts and checkouts. The application has distinct roles for super admins and regular users.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - JWT Authentication
  - TypeScript
  - MongoDB
  - NodeMailer (for sending emails)

- **Frontend**:
  - React
  - Redux
  - TypeScript
  - Chakra UI

## Features

- **User Authentication**:
  - Users can log in and log out.
  - Upon logging in, users receive a welcome message: `"Hello, <email-of-the-user>!"`.

- **Roles**:
  - Users can be either a regular user or a super admin.
  - Super admins can manage a list of products.

- **Product Management**:
  - Each product has an image, title, description, and price.
  - Super admins can manage products.

- **Cart Functionality**:
  - Regular users can browse products and add them to a cart.
  - Users can add multiple products to the cart.
  - Users can review the cart and proceed to checkout.
  - On checkout, the cart is cleared, and a success message is shown.

- **Email Notifications**:
  - An email is sent to the user after a successful cart checkout.

## Deployment

- **Backend**: [https://ecommerce-assignment-codemancers-backnd.onrender.com/](https://ecommerce-assignment-codemancers-backnd.onrender.com/)
- **Frontend**: [https://ecommerce-assignment-codemancers-frontend.vercel.app/](https://ecommerce-assignment-codemancers-frontend.vercel.app/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env

    PORT=<your-port || 3000>
    MongoDB_URL=<your-mongodb-url>
    JWT_SECRET_KEY=<your-jwt-secret-key>
    JWT_SECRET_KEY_EXPIRE=<according to you>
    EMAIL_SERVICE=<your-service>
    EMAIL_USERNAME=<your-email-user-name>
    EMAIL_PASSWORD=<you-email-service-password>
    EMAIL_FROM=<sender -mail>
    ```

4. **Start the backend server:**

    ```bash
    npm start
    ```

5. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6. **Start the frontend development server:**

    ```bash
    npm start
    ```

## Contributing

Feel free to submit issues and pull requests if you have suggestions for improvements or bug fixes.


