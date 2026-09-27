/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Üç iddia: kabul etmeden önce sınayalım', en: 'Three claims: test before accepting',
      note: 'Okul gazetesinde yemekhane üzerine üç iddia var. Başkalarının sonuçlarını hemen kabul etmeyelim; önce verilere bakıp sınayalım.' },
    { scene: 2, start: 10.8, end: 19.4, tr: 'Eksen 23’ten başlıyor!', en: 'The axis starts at 23!',
      note: 'Birinci iddia: yemeği sevmeyenler, sevenlerin 3 katı. Grafikte sevmiyor çubuğu gerçekten 3 kat uzun görünüyor. Ama dikey eksene bakın: 0’dan değil, 23’ten başlıyor.' },
    { scene: 2, start: 19.8, end: 27.8, tr: '24 ile 26 neredeyse eşit: çürütüldü', en: '24 and 26 are almost equal: refuted',
      note: 'Ekseni 0’dan başlatalım: 24 ile 26 neredeyse eşit. 26, 24’ün 3 katı değil. Grafik yanıltıcıydı; iddia çürütüldü.' },
    { scene: 3, start: 28.6, end: 37.8, tr: 'Kime soruldu?', en: 'Who was asked?',
      note: 'İkinci iddia: okulun çoğu yemeği sevmiyor. Ankete 20 öğrenci katılmış, 15’i sevmiyor. Peki kime sorulmuş? Yemekhane kuyruğunun en sonundaki 20 kişiye.' },
    { scene: 3, start: 38.2, end: 45.8, tr: 'Yanlı örneklem: kabul edilemez', en: 'A biased sample: not acceptable',
      note: 'Kuyruğun sonunda bekleyenler yemek soğuduğu için şikâyetçi olabilir. Bu örneklem okulun tamamını temsil etmiyor; iddia bu veriyle kabul edilemez.' },
    { scene: 4, start: 46.6, end: 55.0, tr: 'Her sınıftan 60 öğrenci: 39 seviyor', en: '60 from every class: 39 like it',
      note: 'Üçüncü iddia: öğrencilerin çoğu yemeği seviyor. Bu ankette her sınıftan eşit sayıda, toplam 60 öğrenciye sorulmuş. 39’u seviyor, 21’i sevmiyor. Grafiğin ekseni 0’dan başlıyor.' },
    { scene: 4, start: 55.4, end: 63.8, tr: '39, 30’dan fazla: kabul edilir', en: '39 is more than 30: accepted',
      note: '60’ın yarısı 30; 39 bundan fazla. Örneklem okulu temsil ediyor, sayılar iddiayı destekliyor. Bu iddiayı kabul edebiliriz.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'Dört soru sor', en: 'Ask four questions',
      note: 'Bir iddiayı sınarken dört soru soralım: kime ve kaç kişiye soruldu? Örneklem herkesi temsil ediyor mu? Grafiğin ekseni 0’dan başlıyor mu? Sayılar iddiayı destekliyor mu?' },
    { scene: 5, start: 75.0, end: 79.8, tr: 'Üçüncü iddia hepsini geçti', en: 'The third claim passes them all',
      note: 'Birinci iddia grafikte, ikinci iddia örneklemde takıldı. Üçüncü iddia dört soruyu da geçti.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Kime soruldu? Eksen nereden başlıyor?', en: 'Who was asked? Where does the axis start?',
      note: 'Aklında kalsın: veriye ve grafiğe dikkatle bak; kime sorulduğunu ve eksenin nereden başladığını kontrol et.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kanıta göre karar ver!', en: 'Decide by the evidence!',
      note: 'Sonra kanıta göre karar ver: çürüt ya da kabul et!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
