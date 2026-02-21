"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// .env dosyasını proje kökünden açıkça yükle (ts-node-dev cwd = proje kökü)
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basit istek loglama (hata ayıklama için)
app.use((req, _res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api/users', users_1.default);
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
app.get('/grafikler', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'grafikler.html'));
});
// Önce veritabanını hazırla, sonra sunucuyu başlat
(0, db_1.initDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    });
})
    .catch((err) => {
    console.error('[DB_INIT] Başlatma hatası:', err);
    process.exit(1);
});
