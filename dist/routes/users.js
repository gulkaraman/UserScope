"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
// Tüm kullanıcılar (filtreli: ?yas=25 | ?yas_min=20&yas_max=29 | ?cinsiyet=Erkek)
router.get('/', async (req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const { yas, yas_min, yas_max, cinsiyet } = req.query;
        let sql = 'SELECT id, ad_soyad, email, yas, cinsiyet, created_at, updated_at FROM users WHERE 1=1';
        const params = [];
        if (yas !== undefined && yas !== '') {
            sql += ' AND yas = ?';
            params.push(Number(yas));
        }
        else {
            if (yas_min !== undefined && yas_min !== '') {
                sql += ' AND yas >= ?';
                params.push(Number(yas_min));
            }
            if (yas_max !== undefined && yas_max !== '') {
                sql += ' AND yas <= ?';
                params.push(Number(yas_max));
            }
        }
        if (cinsiyet !== undefined && cinsiyet !== '') {
            sql += ' AND cinsiyet = ?';
            params.push(String(cinsiyet));
        }
        sql += ' ORDER BY created_at DESC';
        const [rows] = await pool.execute(sql, params);
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Kullanıcılar listelenirken hata oluştu.' });
    }
});
// İstatistikler: yaş grupları ve cinsiyet dağılımı (/stats/* :id'den önce olmalı)
router.get('/stats/age', async (_req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const [rows] = await pool.execute(`
      SELECT 
        CASE 
          WHEN yas < 20 THEN '0-19'
          WHEN yas BETWEEN 20 AND 29 THEN '20-29'
          WHEN yas BETWEEN 30 AND 39 THEN '30-39'
          WHEN yas BETWEEN 40 AND 49 THEN '40-49'
          WHEN yas BETWEEN 50 AND 59 THEN '50-59'
          ELSE '60+'
        END AS yas_grubu,
        COUNT(*) AS adet
      FROM users
      GROUP BY yas_grubu
      ORDER BY FIELD(yas_grubu, '0-19', '20-29', '30-39', '40-49', '50-59', '60+')
    `);
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Yaş istatistikleri alınırken hata oluştu.' });
    }
});
router.get('/stats/gender', async (_req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const [rows] = await pool.execute('SELECT cinsiyet, COUNT(*) AS adet FROM users GROUP BY cinsiyet ORDER BY cinsiyet');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Cinsiyet istatistikleri alınırken hata oluştu.' });
    }
});
// Tek kullanıcı
router.get('/:id', async (req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const [rows] = await pool.execute('SELECT id, ad_soyad, email, yas, cinsiyet, created_at, updated_at FROM users WHERE id = ?', [req.params.id]);
        const arr = rows;
        if (arr.length === 0)
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        res.json(arr[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Kullanıcı getirilirken hata oluştu.' });
    }
});
// Yeni kullanıcı
router.post('/', async (req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const body = req.body;
        const { ad_soyad, email, yas, cinsiyet } = body;
        if (!ad_soyad?.trim() || !email?.trim() || yas == null || !cinsiyet) {
            return res.status(400).json({ error: 'ad_soyad, email, yas ve cinsiyet zorunludur.' });
        }
        const [result] = await pool.execute('INSERT INTO users (ad_soyad, email, yas, cinsiyet) VALUES (?, ?, ?, ?)', [ad_soyad.trim(), email.trim(), Number(yas), cinsiyet]);
        const insertId = result.insertId;
        const [rows] = await pool.execute('SELECT id, ad_soyad, email, yas, cinsiyet, created_at, updated_at FROM users WHERE id = ?', [insertId]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        const e = err;
        if (e?.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Bu e-posta adresi zaten kayıtlı.' });
        }
        console.error(err);
        res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu.' });
    }
});
// Güncelle
router.put('/:id', async (req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const body = req.body;
        const { ad_soyad, email, yas, cinsiyet } = body;
        const id = req.params.id;
        const [existing] = await pool.execute('SELECT id FROM users WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }
        const updates = [];
        const params = [];
        if (ad_soyad !== undefined) {
            updates.push('ad_soyad = ?');
            params.push(ad_soyad.trim());
        }
        if (email !== undefined) {
            updates.push('email = ?');
            params.push(email.trim());
        }
        if (yas !== undefined) {
            updates.push('yas = ?');
            params.push(Number(yas));
        }
        if (cinsiyet !== undefined) {
            updates.push('cinsiyet = ?');
            params.push(cinsiyet);
        }
        if (updates.length === 0) {
            const [rows] = await pool.execute('SELECT id, ad_soyad, email, yas, cinsiyet, created_at, updated_at FROM users WHERE id = ?', [id]);
            return res.json(rows[0]);
        }
        params.push(id);
        await pool.execute(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
        const [rows] = await pool.execute('SELECT id, ad_soyad, email, yas, cinsiyet, created_at, updated_at FROM users WHERE id = ?', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        const e = err;
        if (e?.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Bu e-posta adresi zaten kayıtlı.' });
        }
        console.error(err);
        res.status(500).json({ error: 'Kullanıcı güncellenirken hata oluştu.' });
    }
});
// Sil
router.delete('/:id', async (req, res) => {
    try {
        const pool = (0, db_1.getPool)();
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        const affected = result.affectedRows;
        if (affected === 0)
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Kullanıcı silinirken hata oluştu.' });
    }
});
exports.default = router;
