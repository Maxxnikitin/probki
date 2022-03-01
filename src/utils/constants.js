export const yandexMaps = {
  krasnoarmeiskaya:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A863a896d72493bf2f7a1a8e1f3556c0d326a1763dd0147309a232e0911fdcd48&amp;source=constructor",
  kosmonavtov:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A4e709d3f381f4d522908094fd4c2c5b0d9370b9945bfc1e50956d653d13847f0&amp;source=constructor",
  krymskaya:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A5db4d042fb3a69000b2c0a595a1573977079dd4742da693ead7921f4dc992451&amp;source=constructor",
  dugina:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A0beb8f47084ecd23dd87491d677828597cc1892787d66d29dc3b4aa5560da4c1&amp;source=constructor",
  solnechnaya:
    "https://yandex.ru/map-widget/v1/?um=constructor%3Ac9c097cb2f4c291e4b337b2c97832a1de119b9dd8dbc79b34422f5a4d695e1db&amp;source=constructor",
  chkalova:
    "https://yandex.ru/map-widget/v1/?um=constructor%3Acbae1472c2ade0fbd3426374bef36bc658ed66767b1a81805bc7dc79771d79d6&amp;source=constructor",
  bazhenova:
    "https://yandex.ru/map-widget/v1/?um=constructor%3Aa795649342ccad240c5a24985411768372b583da6460d1d975c9b86b254cb4e5&amp;source=constructor",
  barykina:
    "https://yandex.ru/map-widget/v1/?um=constructor%3Ae77a607e303315faf2a9b40426e35e059e00176ecea92130a311b7f50032252c&amp;source=constructor",
  pochtovoe:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A00722cb9ee14dc653e36edeea0b6fdf077d370d784c2a3c88717341f2fa6b03d&amp;source=constructor",
  sosnovaya:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A581dc06bb5f4e6a84c47c0adbbefbb0a23b78e30db4f344c5e45395379dc23bf&amp;source=constructor",
};

export const URL = "https://probkishop.ru/api/v1";

export const getPrice = (good) => {
  if (!good?.price) {
    return "-";
  } else {
    const coins = good?.price.split(".")[1];
    if (coins === "00") {
      return +good?.price.split(".")[0];
    } else {
      return +`${good?.price.split(".")[0]}.${coins[0]}`;
    }
  }
};
