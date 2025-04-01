# EcoShop - Full-Stack Ecommerce Project

<div align="center">
  <!-- Optional: Add a banner/screenshot here -->
  <!-- <img src="link-to-your-banner.png" alt="EcoShop Banner" width="800"> -->
  <p>
    <em>A modern, responsive ecommerce web application built to showcase full-stack development skills.</em>
  </p>
</div>

---

## 🌟 About The Project

EcoShop is a full-stack web application designed as a portfolio piece. It simulates a real-world online store, featuring product displays, user interactions, and a clean interface. The project demonstrates proficiency in both frontend and backend development, creating a seamless user experience.

**(Optional: Add a link to the live deployment if you have one)**
<!--
**Live Demo:** [https://your-ecoshop-deployment-link.com](https://your-ecoshop-deployment-link.com)
-->

---

## ✨ Features

*   **Product Catalog:** Browse products with images, descriptions, and prices.
*   **Featured Products:** Highlights specific products on the homepage.
*   **Responsive Design:** Adapts to various screen sizes (desktops, tablets, mobiles).
*   **Styled Components:** Modern UI built with styled-components for maintainable CSS.
*   **Homepage:** Engaging hero section, promotional banners, and featured product grid.
*   **Newsletter Signup:** Functional signup form (currently mocked, adaptable for backend integration).
*   **(Add more features as you implement them, e.g., Product Details Page, Cart, User Auth, Checkout)**

---

## 🛠️ Technologies Used

*   **Frontend:**
    *   React.js
    *   React Router
    *   Styled Components
    *   `fetch` API (for interacting with backend)
*   **Backend:**
    *   Python
    *   Django
    *   SQLite3 (for development)
*   **Development Tools:**
    *   Git & GitHub
    *   pip (Python package installer)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js & npm (or yarn) installed: [https://nodejs.org/](https://nodejs.org/)
*   Python 3.x installed: [https://www.python.org/](https://www.python.org/)
*   pip installed (usually comes with Python)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NaviAndrei/EcommercePro.git 
    cd EcommercePro
    ```
2.  **Backend Setup:**
    *   Navigate to the backend directory (if separate): `cd backend` *(Adjust path if needed)*
    *   **(Optional but recommended) Create and activate a virtual environment:**
        ```bash
        python -m venv venv
        # On Windows
        .\venv\Scripts\activate
        # On macOS/Linux
        # source venv/bin/activate
        ```
    *   Install Python dependencies:
        ```bash
        pip install -r requirements.txt 
        ```
        *(Ensure you have a `requirements.txt` file in your backend directory)*
    *   Apply database migrations:
        ```bash
        python manage.py migrate
        ```
    *   **(Optional) Create a superuser for the Django admin:**
        ```bash
        python manage.py createsuperuser
        ```
    *   Start the backend server:
        ```bash
        python manage.py runserver
        ```
        *Make note of the port the backend runs on (default is 8000).*

3.  **Frontend Setup:**
    *   Navigate to the frontend directory: `cd ../frontend` *(Adjust path if needed)*
    *   Install dependencies:
        ```bash
        npm install
        # Or using yarn
        # yarn install
        ```
    *   Configure API endpoint: Ensure the frontend code (e.g., in `HomePage.jsx` or a config file) points to the correct backend server address (e.g., `http://localhost:8000/api`).
    *   Start the frontend development server:
        ```bash
        npm start
        # Or using yarn
        # yarn start
        ```
4.  Open your browser and navigate to `http://localhost:3000` (or the port specified by the React development server).

---

## 🖼️ Screenshots (Optional)

<!-- Add screenshots of your application here -->
<!--
![Homepage Screenshot](link-to-screenshot.png)
_Homepage View_

![Product Grid Screenshot](link-to-screenshot.png)
_Product Grid_
 -->

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information. 

---

## 👤 Contact

Andrei Ivan
*   **Website:** [https://syncwithivan.com](https://syncwithivan.com)
*   **Email:** [ivan.andrei@syncwithivan.com](mailto:ivan.andrei@syncwithivan.com)
*   **Project Link:** [https://github.com/NaviAndrei/EcommercePro](https://github.com/NaviAndrei/EcommercePro)

---

<p align="center">
  <em>Thank you for checking out EcoShop!</em>
</p> 