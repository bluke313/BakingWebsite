const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Connect to database
const db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

app.get('/published', (req, res) => {
    db.all('SELECT * FROM items WHERE isPublished = 1', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows })
    });
});

app.get('/drafts', (req, res) => {
    db.all('SELECT * FROM items WHERE isPublished = 0', [], (err, rows) => {
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

app.put('/update-item', upload.single('image'), (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const { id, newName, title1, title2, description1, description2, fall, winter, spring, summer } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const sql = `
        UPDATE items 
        SET name = ?, 
            titleLine1 = ?, 
            titleLine2 = ?, 
            descriptionParagraph1 = ?, 
            descriptionParagraph2 = ?, 
            fall = ?, 
            winter = ?, 
            spring = ?, 
            summer = ?,
            imagePath = ?
        WHERE id = ?
    `;

    db.run(sql, [newName, title1, title2, description1, description2, fall, winter, spring, summer, imagePath, id], function (err) {
        if (err) {
            console.log( err );
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Items updated successfully',
        });
    });
});

app.put('/publish-item', (req, res) => {
    const { id } = req.body;

    const sql = 'UPDATE items SET isPublished = 1 WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            console.log( err );
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Items published successfully',
        });
    });
});

app.post('/new-draft', async (req, res) => {
    const name = "untitled";
    const sql = 'INSERT INTO items (name) VALUES (?)';

    try {
        db.run(sql, [name]);
        res.status(200).json({ message: "Draft added successfully"});
    } catch (error) {
        res.status(500).json({ error: "Error adding draft to the database"});
    }
});

app.post('/delete-item', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM items WHERE id = ?`;

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error deleting the item from the database" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});