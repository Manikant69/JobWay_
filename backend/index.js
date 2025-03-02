import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

//connect to db
connectDB();
const app = express();

// List of allowed origins
const allowedOrigins = ['https://job-way.vercel.app', 'http://localhost:8000', 'http://localhost:5173','https://job-way-api.vercel.app'];

// Set up CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow origin
    } else {
      callback(new Error('Not allowed by CORS')); // Deny origin
    }
  },
  credentials: true, // Allow cookies and credentials
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.listen(PORT,()=>{
    console.log(`Server running at port http://localhost:${PORT}`);
})