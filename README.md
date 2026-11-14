# FarmConnect — Farmers' Market Platform

A starter full-stack marketplace based on Problem Statement 15. It includes three independent portals:
- Farmer: `/farmer/login` and `/farmer/register`
- Customer: `/customer/login` and `/customer/register`
- Admin: `/admin/login` (no public registration)

All portals use one centralized Express API and MongoDB database. The database stores users in one `users` collection with a `role` field. Farmer accounts start as `pending` and need admin approval. Customers can access the marketplace after registration. Admin accounts are created from environment variables, not public signup.

## Requirements
- Node.js 18+
- MongoDB local service or MongoDB Atlas connection

## Setup (Windows PowerShell)

1. Extract the ZIP and open the `FarmConnect` folder in VS Code.
2. Open a terminal in that folder.
3. Install packages:

   ```powershell
   npm install
   ```

4. Create your environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

5. Open `.env` and set a long unique `JWT_SECRET`, your MongoDB connection string, and a strong admin password.
6. Start MongoDB if you are using a local database.
7. Create the first admin account:

   ```powershell
   npm run seed:admin
   ```

8. Start the application:

   ```powershell
   npm run dev
   ```

9. Open `http://localhost:5000`.

## Demo portal URLs
- Public home: `http://localhost:5000/`
- Farmer login: `http://localhost:5000/farmer/login`
- Farmer registration: `http://localhost:5000/farmer/register`
- Customer login: `http://localhost:5000/customer/login`
- Customer registration: `http://localhost:5000/customer/register`
- Admin login: `http://localhost:5000/admin/login`

## Main API routes
- `POST /api/auth/register/farmer`
- `POST /api/auth/register/customer`
- `POST /api/auth/login/farmer`
- `POST /api/auth/login/customer`
- `POST /api/auth/login/admin`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products` (farmer)
- `PUT /api/products/:id` (owner farmer)
- `DELETE /api/products/:id` (owner farmer)
- `POST /api/orders` (customer)
- `GET /api/orders/my` (customer or farmer)
- `PATCH /api/orders/:id/status` (farmer)
- `GET /api/admin/summary` (admin)
- `GET /api/admin/farmers` (admin)
- `PATCH /api/admin/farmers/:id/approve` (admin)
- `DELETE /api/admin/products/:id` (admin)

## Notes
- Payment gateway is intentionally not included, matching the assignment's 12-hour hackathon scope.
- Messaging is left as a future optional extension.
- For production deployment, use HTTPS, secure cookie/token storage, stronger validation, email verification, password reset, audit logging and a managed database.
