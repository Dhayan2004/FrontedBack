import express from "express";
import cors from "cors"; 
import rateLimit from "express-rate-limit"; 
import entryRoutes from "./routes/routes";

const app = express();

const postLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 20, 
  message: { error: "Has enviado demasiados registros. Intenta de nuevo en 2 minutos." },
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(cors()); 
app.use(express.json());

app.use("/entries", (req, res, next) => {
  if (req.method === "POST") {
    return postLimiter(req, res, next);
  }
  next();
}, entryRoutes);

app.get("/", (req, res) => {
  res.send("API protegida");
});

const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});