# TutorLink App

Welcome to TutorLink App, a robust, scalable, and feature-rich API for managing tutor-student interactions, booking tutoring sessions, handling payments, and more. Built with Node.js, Express.js, Mongoose, and TypeScript, it streamlines tutor management, student bookings, subject assignments, and real-time availability tracking.
With TutorLink, you can:
✅ Seamlessly manage tutor profiles & subjects
✅ Book & schedule tutoring sessions with instant availability checks
✅ Secure payment processing and real-time transaction verification
✅ Instant error handling & validation responses for better user experience
✅ Scalable architecture ensuring smooth performance

## Features

### Auth Management

You can log in securely with robust authentication, ensuring safe access and data protection for tutors and students. 🔐

- Login
- Register
- Role based access(JWT Token)
- Logout

### Tutor Management

Tutors can create and update their profiles, set availability, and manage subjects, while students can view tutor details before booking

- Profile
- Active Sessions
- Booking Requests
- Student Details
- Booking Details
- Earnings

### Student Management

Students can create profiles, browse tutors, and book sessions, while tutors can view student details and manage bookings efficiently

- Profile
- Booking
- Review Tutor

### Subject Management

Tutors can create and manage subjects, while students can browse and enroll in available subjects seamlessly.

- Create Subject
- Get Subject by Id, Name
- Get All Subjects

### Booking Management

Students can schedule tutoring sessions and make secure payments, while tutors can manage appointments, approve bookings, and track session statuses in real-time.

- Booking Status
- Booking Details
- Booking Payment

### Error Handling

You will get a consistant error response with a details of each errors.

## Getting Started

Follow these simple steps to set up and run the project on your local machine:

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (Recommended version: v22.11.0)
- Express (^4.21.2) - Web framework
- Mongoose (^8.12.1) - MongoDB object modeling
- Dotenv (^16.4.7) - Environment variable management
- CORS (^2.8.5) - Cross-Origin Resource Sharing
- Zod (^3.24.2) - Schema validation
- HTTP-Status (^2.1.0) - HTTP status code utilities
- Bcrypt (^5.1.1) - Password hashing
- JSON Web Token (JWT) (^9.0.2) - Authentication and authorization
- ShurjoPay (^0.12.1) - Payment gateway integration

You'll also need a package manager like npm or yarn to install dependencies.
For development, TypeScript should be added as a devDependency.
You're all set! 🚀 Let’s get started! 🎉

### Installation guide

## Setting Up the Project Locally 🚀

Follow these steps to get the project up and running on your local machine:

### **1️⃣ Clone the Repository**

Start by cloning the GitHub repository:

```bash
git clone https://github.com/Ridwan-Suhel/car-store-api.git
```

### **2️⃣ Install Dependencies**

Run the following command to install all required packages:

```bash
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a .env file in the root directory and add the following:

```bash
npm install
```

Replace DATABASE_URL with your actual database connection string.

### **4️⃣ Start the Server**

To launch the server, use:

```bash
npm run start:dev
```

The server should now be running on port 5000 (or the one you set in the .env file).

### **5️⃣ Check for Linting Issues**

Ensure your code follows best practices by running:

```bash
npm run lint
```

You're all set! 🎉 Your project is now up and running. 🚀

## 📌 API Endpoints Documentation

Below is a structured list of the major API endpoints available in the **TutorLink API**. These endpoints allow users (students and tutors) to register, book sessions, manage accounts, and more.

---

### 🛡️ Authentication

- **Register as a Tutor:** `POST /auth/register/tutor`
- **Register as a Student:** `POST /auth/register/student`
- **Login:** `POST /auth/login`

---

### 👨‍🏫 Tutor Management

- **Get All Tutors:** `GET /tutor/all-tutors`
- **Get Tutor by ID:** `GET /tutor/{tutorId}`
- **Get Tutor Bookings:** `GET /tutor/bookings/{tutorId}`
- **Get Active Sessions:** `GET /tutor/active-sessions`
- **Get Tutor Profile:** `GET /tutor/me`
- **Update Tutor Profile:** `PUT /tutor/update`

---

### 🎓 Student Management

- **Get Student by Email:** `GET /student/{email}`
- **Search Students by Subject:** `GET /student/search?subject={subjectName}`
- **Get Student Profile:** `GET /student/me`
- **Update Student Profile:** `PUT /student/update`

---

### 📚 Subject Management

- **Get Subject by ID:** `GET /subject/{subjectId}`
- **Create a New Subject (Tutor Only):** `POST /subject/create`

---

### 📅 Booking Management

- **Book a Session:** `POST /booking`
- **Get Booking by ID:** `GET /booking/{bookingId}`
- **Get All Bookings:** `GET /booking/bookings`
- **Cancel a Booking:** `DELETE /booking/cancel/{bookingId}`
- **Verify Payment:** `GET /booking/verify?order_id={orderId}`
- **Get Tutor Booking Requests:** `GET /tutor/booking-requests`
- **Get Earnings from Bookings:** `GET /booking/earnings`

---

### ⭐ Reviews Management

- **Submit or Get a Review:** `GET /reviews/review/{tutorId}`
- **Update a Review:** `PATCH /reviews/review/{reviewId}`

---

### 🔗 Additional Notes

- All API endpoints follow **RESTful** principles.
- Ensure proper authentication headers when accessing **protected routes**.
- Response structure includes **success messages, error handling, and necessary data fields**.

📌 _For a more detailed API reference and request/response samples, refer to the official documentation._

---

### About Me 🙋‍♂️

Hi! My name is Abidur Rahman Arko. I'm a passionate developer who loves creating efficient and user-friendly solutions. This project reflects my expertise in backend development, API design, and scalable system architecture.

### Links 🔗

- GitHub Repository: [Tutor Link Backend Repo](https://github.com/aro-arko/Tutor-Link/tree/main/backend)
- Live API: [Tutor Link API](https://tutor-link-backend-server.vercel.app/)
