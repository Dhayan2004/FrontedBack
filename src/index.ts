import express from "express";
import cors from "cors"; 
import rateLimit from "express-rate-limit"; 
import entryRoutes from "./routes/routes";

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 20, 
  message: { error: "Has enviado demasiados registros. Intenta de nuevo en 5 minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors()); 
app.use(express.json());

app.use(limiter); 

app.use("/entries", entryRoutes);

app.get("/", (req, res) => {
  res.send("API de Dhayan funcionando y protegida contra spam");
});

const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});