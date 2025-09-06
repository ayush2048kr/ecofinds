# EcoFinds - A Sustainable Marketplace

EcoFinds is a React-based marketplace application built with Vite, Tailwind CSS, and Firebase, designed to promote the buying and selling of pre-owned goods. This platform aims to give products a second chance, fostering a more sustainable and eco-friendly approach to consumption.

## Features

-   **User Authentication:** Secure signup and login using Firebase Auth.
-   **Product Listings:** Browse, search, and filter product listings.
-   **Shopping Cart:** Add products to a cart and proceed to checkout.
-   **User Dashboard:** Manage profile information, view purchase history, and manage listed products.
-   **Responsive Design:** Built with Tailwind CSS for a seamless experience across devices.
-   **Loading skeletons:** Implemented loading page skeletons for better UX.

## Technologies Used

-   **Frontend:**
    -   React
    -   Vite
    -   Tailwind CSS
    -   Lucide React Icons
    -   React Router
-   **Backend:**
    -   Node.js
    -   Express
    -   Firebase (for authentication)
-   **Other:**
    -   `.env` for environment variables
    -   ESLint for code linting

## Getting Started

### Prerequisites

-   Node.js and npm installed
-   Firebase project set up

### Installation

1.  Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```sh
    cd Ecofinds
    ```

3.  Install dependencies for the frontend:

    ```sh
    npm install
    ```

4.  Install dependencies for the backend:

    ```sh
    cd server
    npm install
    cd ..
    ```

5.  Set up environment variables:

    -   Create a `.env` file in the `server` directory.
    -   Add your Firebase configuration and other necessary variables (like MongoDB URI, JWT secret) to the `.env` file.  See [server/.env](server/.env) for the list of variables.

### Configuration

-   **Firebase:** Initialize Firebase in `src/firebase.js` with your project credentials.
-   **Backend:** Configure the server in `server/server.js` to connect to your database and set up any necessary API endpoints.

### Running the Application

1.  Start the backend server:

    ```sh
    cd server
    npm start
    cd ..
    ```

2.  Start the frontend development server:

    ```sh
    npm run dev
    ```

    or use the `start-dev.sh` script:

    ```sh
    ./start-dev.sh
    ```

    This script starts both the frontend and backend servers concurrently.

3.  Open your browser and navigate to `http://localhost:5173` to view the application.

## Scripts

-   `dev`: Starts the Vite development server.
-   `build`: Builds the application for production.
-   `lint`: Lints the code with ESLint.
-   `preview`:  Runs the build in preview mode

## Project Structure
