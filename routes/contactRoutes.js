
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');


router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

module.exports = router;
