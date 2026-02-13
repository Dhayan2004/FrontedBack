import { Request, Response, NextFunction } from "express";

export const validateEntry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "El contenido es obligatorio" });
  }

  if (typeof content !== "string" || content.length > 10) {
    return res.status(400).json({ 
      error: "El contenido debe ser texto y no mayor a 10 caracteres" 
    });
  }

  const pathTraversalPattern = /(\.\.\/|\.\.\\|\/|\\)/;
  if (pathTraversalPattern.test(content)) {
    return res.status(403).json({ 
      error: "Intento de acceso ilegal a directorios detectado (Path Traversal)" 
    });
  }

  const safeRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;
  if (!safeRegex.test(content)) {
    return res.status(400).json({ 
      error: "No se permiten caracteres especiales por seguridad" 
    });
  }

  next();
};