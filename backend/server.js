import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Resolves the current directory

app.use(express.json()); // Allows us to accept JSON data in the req.body

// API Routes
app.use("/api/products", productRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
    // Ensure the static files are served correctly from the build directory
    app.use('/assets', express.static(path.join(__dirname, 'frontend', 'dist', 'assets'), {
        setHeaders: (res, path) => {
            if (path.endsWith('.js')) {
                res.set('Content-Type', 'application/javascript');
            }
        }
    }));
    
    // Serve index.html for all non-API routes to enable React Router
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
