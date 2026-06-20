# Mishra Tour & Travels - Full-Stack Car Rental Application

A premium, full-stack car rental web application built using **React** (Vite + JavaScript) for the frontend, **Spring Boot** (Java) for the backend, and **MySQL** for database storage. 

---

## 🚀 Technology Stack
* **Frontend**: React (Vite), React Router, Lucide Icons, Vanilla CSS (Premium Glassmorphic Design).
* **Backend**: Spring Boot 3, Spring Data JPA, Spring Security (Stateless JWT), Lombok, Maven.
* **Database**: MySQL.

---

## 📂 Project Structure
```
Car/
├── database/
│   └── schema.sql                  # MySQL database tables and seed data
├── backend/
│   ├── pom.xml                     # Maven dependencies
│   └── src/main/
│       ├── java/.../               # REST controllers, JPA entities, security configuration
│       └── resources/
│           └── application.properties # Database connection & JWT configurations
└── frontend/
    ├── package.json                # Node dependencies
    ├── vite.config.js              # Vite server & backend API proxy settings
    ├── index.html                  # Main page template
    └── src/
        ├── main.jsx                # React mount point
        ├── App.jsx                 # Routing configuration & guards
        ├── index.css               # Design system & styles (Vanilla CSS)
        ├── components/             # Navbar, Footer, CarCard components
        ├── context/                # AuthContext (login/logout/token management)
        └── pages/                  # Customer & Admin pages
```

---

## 🛠️ Setup & Running Guide

Follow these steps to run the application locally on your computer:

### 1. Database Configuration
1. Start your local **MySQL Server**.
2. Open your MySQL client (e.g. Command Line, MySQL Workbench, or phpMyAdmin) and run the SQL commands inside [schema.sql](file:///c:/Users/ARUN%20KUMAR%20MISHRA/OneDrive/Desktop/Car/database/schema.sql) to create the database, tables, and populate the default fleet:
   ```sql
   SOURCE c:/Users/ARUN KUMAR MISHRA/OneDrive/Desktop/Car/database/schema.sql;
   ```

### 2. Run Spring Boot Backend
1. Open the [application.properties](file:///c:/Users/ARUN%20KUMAR%20MISHRA/OneDrive/Desktop/Car/backend/src/main/resources/application.properties) file.
2. Update the database credentials if necessary:
   * `spring.datasource.username`: Your MySQL username (default: `root`)
   * `spring.datasource.password`: Your MySQL password (default: empty)
3. Open a terminal, navigate to the `backend/` directory, and run the following command to start the server:
   ```bash
   mvn spring-boot:run
   ```
4. The backend API will start on **`http://localhost:8080`**.

### 3. Run React Frontend
1. Open a new terminal, navigate to the `frontend/` directory.
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address displayed in the console (usually **`http://localhost:5173`**).

---

## 🔑 Default Credentials

### Administrator Account
* **Email**: `admin@mishratravels.com`
* **Password**: `admin123`

### Customer Account
* You can create a new account directly from the **Sign Up** page.
* Alternatively, use any custom credentials you sign up with.

---

## 🗺️ Completed Flows

### Customer Experience Journey
1. **Sign Up / Login**: Standard customer registration. Logged-in session is managed via JWT.
2. **Dashboard (Home)**: Search bar, customer reviews, promotional banners, and featured vehicle grid.
3. **Browse Cars**: Search and filter cars by name, fuel type (Diesel, Petrol, CNG), and seating capacity.
4. **View Details**: Interactive gallery of the vehicle, specifications list, description, and "Book Now" trigger.
5. **Booking Form**: Auto-populates profile contact info. Captures pickup/drop locations and trip dates.
6. **₹100 Advance Payment**: Select PhonePe, Google Pay, Paytm, or UPI. Displays a simulated QR code for checkout.
7. **Booking Success**: Shows booking summary and unique `MTTXXXX` ID.
8. **My Bookings**: Real-time table showcasing approval status (`Pending`, `Approved`, `Rejected`).
9. **User Profile**: Update details (name, mobile) or secure password change.
10. **Services / About / Contact**: Informative pages and contact inquiry submission form.

### Backoffice Admin Journey
1. **Admin Login**: Separate portal for travel agency staff.
2. **Admin Dashboard**: View total user registrations, active vehicle listings, total bookings, and calculate live earnings (sums of advance payment of approved trips).
3. **Manage Bookings**: View a table of all user requests. Click **Approve** or **Reject** to update status.
4. **Manage Fleet**: Full CRUD dashboard. Create a vehicle, update pricing or availability, edit properties, or delete vehicle catalog listings.
5. **Manage Users**: View customer details, click **Block** to restrict login access immediately, or **Delete** their account.
