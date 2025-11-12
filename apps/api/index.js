// apps/api/index.js

import express from 'express';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import path from 'path';

// Garante que o .env seja lido corretamente no ambiente local (Windows/Node.js)
// Ele força a leitura do arquivo .env dentro da pasta api.
config({ path: path.join(path.resolve(), 'apps', 'api', '.env') }); 

// --- Configurações Iniciais ---
const app = express();
const PORT = 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// 1. Configuração de Segurança (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// --- Endpoints da API ---

// Endpoint de Saúde (Para testar se o servidor está ligado)
app.get('/api/health', (req, res) => {
    // Se você ver essa mensagem, o servidor Node.js está funcionando!
    res.json({ ok: true, msg: 'API de Clima está funcionando!' });
});

// Endpoint Principal (Para buscar dados de clima)
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;

    if (!OPENWEATHER_API_KEY) {
        // Se essa mensagem aparecer, o problema é 100% o arquivo .env
        return res.status(500).json({ error: 'Chave da API não configurada.' });
    }

    try {
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=${OPENWEATHER_API_KEY}`;
        
        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod === 404) {
            return res.status(404).json({ error: 'Cidade não encontrada.' });
        }

        const formattedData = {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity
        };

        res.json(formattedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao buscar dados de clima.' });
    }
});

// --- Inicia o Servidor ---
app.listen(PORT, () => {
    console.log(`API de Clima rodando na porta ${PORT}`);
});