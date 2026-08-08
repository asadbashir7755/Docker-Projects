const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
// const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session"); 
const connectDB = require("./config/db");
const API_ENDPOINTS = require("./config/apiconfig");
const path = require("path");
const passport = require("passport");
require("./config/passport"); // Ensure passport configuration is loaded

// dotenv.config(); 

const checkout = require("./controllers/checkout"); // Import checkout controller

const startServer = async () => {
  await connectDB();

  const app = express();

  // Stripe webhook route BEFORE any body parsers or middleware
  app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), checkout.stripeWebhook);
  app.post('/webhook', express.raw({ type: 'application/json' }), checkout.stripeWebhook);

  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  const corsOptions = {
  origin: "http://172.25.144.230", // exact origin
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
  };
  app.use(cors(corsOptions));
  

  // Configure express-session
  app.use(session({
      secret: process.env.SESSION_SECRET, // Use a secret key from environment variables or a default value
      resave: false,
      saveUninitialized: true,
      cookie: { 
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
      }

  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Routes
  app.use("/api/users", require("./routes/userroutes"));
  app.use(API_ENDPOINTS.items.base, require("./routes/itemmanageroutes"));
  app.use("/api", require("./routes/dashboardroutes")); 
  app.use("/api", require("./routes/ManageUserRoutes")); 
  app.use("/auth", require("./routes/authroutes"));
  app.use("/api", require("./routes/reservations")); // Stripe checkout endpoints
  app.use("/api", require("./routes/reservationRoutes")); // Reservation CRUD endpoints
  app.use("/api", require("./routes/contacmessagesroutes"));
  app.use("/api", require("./routes/reviewroutes")); // <-- Add this line for reviews API
  app.use(API_ENDPOINTS.base || "/api", require("./CHATBOT/chatbotroutes"));
  app.get("/health", (req, res) => res.sendStatus(200));

  // const PORT = process.env.PORT || 5000;
  

  // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

};

startServer();
