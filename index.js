// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];

// Ruta para la raíz ("/")
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
  });
  
// Ruta de registro
app.post('/register', (req, res) => {
    const { name, dpi, email, password } = req.body;

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'Email ya está registrado' });
    }

    users.push({ name, dpi, email, password });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Login exitoso', user });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
