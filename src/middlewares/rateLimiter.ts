import rateLimit from "express-rate-limit";

//General rate limiting

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100, // limit each IP to 100 requests per windows
  message: {
    success: "false",
    message: "Too many requests from this IP, Please try again later",
  },

  standardHeaders:true,
  legacyHeaders:false
});
