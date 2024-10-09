const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

app.get('/all', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.get('/fall', (req, res) => {
    db.all('SELECT * FROM items WHERE fall = 1', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.get('/winter', (req, res) => {
    db.all('SELECT * FROM items WHERE winter = 1', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.get('/spring', (req, res) => {
    db.all('SELECT * FROM items WHERE spring = 1', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.get('/summer', (req, res) => {
    db.all('SELECT * FROM items WHERE summer = 1', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.put('/update-item', (req, res) => {
    console.log('Update-item request: ', req.body)
    const { id, newName, title1, title2, description1, description2, fall, winter, spring, summer } = req.body;

    const sql = 'UPDATE items SET name = ?, titleLine1 = ?, titleLine2 = ?, descriptionParagraph1 = ?, descriptionParagraph2 = ?, fall = ?, winter = ?, spring = ?, summer = ? WHERE id = ?';

    db.run(sql, [newName, title1, title2, description1, description2, fall, winter, spring, summer, id], function (err) {
        if (err) {
            console.log( err );
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Items updated successfully',
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});