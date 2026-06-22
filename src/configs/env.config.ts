import dotenv from "dotenv";

dotenv.config();

interface Config {
    PORT:number;
    NODE_ENV:string;
    BASE_URL:string;
    API_URL:string;
    DATABASE_URL:string;
}

const config:Config = {
    PORT: parseInt(process.env.PORT || '3000'),
    NODE_ENV: process.env.NODE_ENV || "development",
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "/api/v1/",
    DATABASE_URL: process.env.DATABASE_URL || ""
}

export default config;