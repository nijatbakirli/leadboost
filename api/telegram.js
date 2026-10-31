/* ============================================================
   Серверная функция (Vercel): приём заявки → отправка в Telegram.
   Токен бота живёт только здесь, как переменная окружения на
   Vercel (Settings → Environment Variables), в клиентском коде
   его нет.
   ============================================================ */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, contact, service, niche, budget, plan } = req.body || {};
  if (!name || !contact) {
    res.status(400).json({ error: "Заполните имя и контакт" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Заявка не отправлена: на Vercel не заданы TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID");
    res.status(500).json({ error: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в переменных окружения" });
    return;
  }

  const text = `🎯 Новая заявка с сайта LeadBoost\n\nИмя: ${name}\nКонтакт: ${contact}\nУслуга: ${service || "не указана"}\nНиша: ${niche || "не указана"}\nБюджет: ${budget || "не указан"}\nТариф: ${plan || "не выбран"}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!tgRes.ok) {
      /* Причина видна в Vercel → Logs: 401 Unauthorized = неверный или
         отозванный токен бота, 400 chat not found = неверный chat_id,
         403 bot was blocked = бота остановили в Telegram (нажать Start). */
      const detail = await tgRes.text().catch(() => "");
      console.error("Telegram API error", tgRes.status, detail.slice(0, 300));
      throw new Error("Telegram API error");
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "Не удалось отправить в Telegram" });
  }
}
