import { Admin } from "../models/Admin.js"
import jwt from 'jsonwebtoken';

export async function createAdmin(req, res) {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(403).json({ message: "Usuário admin já existe." });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Usuário e senha obrigatórios." });
    }

    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: "Admin criado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar admin.", error: err.message });
  }
};

export async function login(req, res) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "Login e/ou senha inválidos." });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  
  console.log(`[LOGIN] Usuário "${username}" autenticado em ${timestamp}`);
  res.status(200).json({ token });
};
