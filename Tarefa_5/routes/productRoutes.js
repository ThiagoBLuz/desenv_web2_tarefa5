// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar um novo produto
router.post('/add', (req, res) => {
  const { nome, preco, descricao } = req.body;
  const query = 'INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)';
  
  db.query(query, [nome, preco, descricao], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting product: ' + err.message);
      return;
    }
    res.status(201).send('Product added successfully');
  });
});

// Listar todos os produtos
router.get('/list', (req, res) => {
  const query = 'SELECT * FROM produtos';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching products: ' + err.message);
      return;
    }
    res.status(200).json(results);
  });
});

// Procurar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM produtos WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching product: ' + err.message);
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
    res.status(200).json(result[0]);
  });
});

// Alterar produto
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao } = req.body;
  const query = 'UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?';
  
  db.query(query, [nome, preco, descricao, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating product: ' + err.message);
      return;
    }
    res.status(200).send('Product updated successfully');
  });
});

// Apagar produto
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM produtos WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting product: ' + err.message);
      return;
    }
    res.status(200).send('Product deleted successfully');
  });
});

module.exports = router;
