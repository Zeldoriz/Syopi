# Syopi - Enough Window Shopping

## Description

Syopi is a minimal e-Commerce React application created with Vite, aimed at providing a simple and fast online shopping experience. The project focuses on delivering a basic setup to get React running in Vite, with built-in Hot Module Replacement (HMR) and some ESLint rules.

You can view the live site here: [syopi.vercel.app](https://syopi.vercel.app/)

## Features

- **Product Search**: Search bar to look up products from a public API's database.
- **Categorization**: Filters products based on pre-defined categories to filter through the database.
- **Login / Logout**: Allows users to uniquely identify themselves by registering and logging into the system through their credentials.
- **Cart**: Each user has a unique cart that is not shared amongst other users.
- **Checkout and Order History**: Items in cart can be checked out and added to the order history section.

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Zeldoriz/Syopi.git
   ```

2. **Install dependencies**:
   Navigate to the project directory and install the required dependencies.

   ```bash
   cd Syopi
   npm install
   ```

3. **Run the project locally**:
   To start the development server and view the project in your browser:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173` by default.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **CSS**: For styling the website.
- **Vite**: A fast and modern build tool for web development.
- **ESLint**: A tool for identifying and reporting on patterns in JavaScript code.
- **Fake Store API**: To serve as an artificial backend.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is open-source and available under the MIT License.
