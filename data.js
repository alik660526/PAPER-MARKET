const data = {
  phone: '+7 XXX XXX-XX-XX',
  maxColor: '#FF6B00',
  address: 'Краснодарский край, г. Новокубанск, ул. Новаторов 1/10',
  inn: 'ИНН 1234567890',
  ogrn: 'ОГРН 1234567890123',
  products: {
    corner: [
      {
        id: 1360,
        article: 1114,
        title: 'Уголок защитный картонный 40x40x3 мм',
        width: 40,
        thickness: 3,
        image: 'images/produkciya/ugolki/40х40х3-optimized.jpg',
        priceTo100: 10.73,
        priceTo500: 10.01,
        priceTo1000: 9.295,
        priceMin: 9.295,
        description: 'Защитный картонный уголок для паллетирования и транспортировки грузов.'
      },
      {
        id: 1361,
        article: 1115,
        title: 'Уголок защитный картонный 40x40x4 мм',
        width: 40,
        thickness: 4,
        image: 'images/produkciya/ugolki/40х40х4-optimized.webp',
        priceTo100: 14.25,
        priceTo500: 13.3,
        priceTo1000: 12.35,
        priceMin: 12.35,
        description: 'Прочный уголок для защиты углов грузов при паллетировании.'
      },
      {
        id: 1362,
        article: 1116,
        title: 'Уголок защитный картонный 40x40x5 мм',
        width: 40,
        thickness: 5,
        image: 'images/produkciya/ugolki/40х40х5-optimized.webp',
        priceTo100: 18.00,
        priceTo500: 16.8,
        priceTo1000: 15.6,
        priceMin: 15.6,
        description: 'Усиленный уголок для тяжёлых грузов и длительного хранения.'
      },
      {
        id: 1363,
        article: 1117,
        title: 'Уголок защитный картонный 50x50x3 мм',
        width: 50,
        thickness: 3,
        image: 'images/produkciya/ugolki/50х50х3-2-optimized.webp',
        priceTo100: 13.50,
        priceTo500: 12.6,
        priceTo1000: 11.7,
        priceMin: 11.7,
        description: 'Уголок шириной 50 мм для защиты габаритных грузов.'
      },
      {
        id: 1364,
        article: 1118,
        title: 'Уголок защитный картонный 50x50x4 мм',
        width: 50,
        thickness: 4,
        image: 'images/produkciya/ugolki/50х50х4-2-optimized.webp',
        priceTo100: 18.60,
        priceTo500: 17.36,
        priceTo1000: 16.12,
        priceMin: 16.12,
        description: 'Надёжная защита для паллет и коробок больших размеров.'
      },
      {
        id: 1365,
        article: 1119,
        title: 'Уголок защитный картонный 50x50x5 мм',
        width: 50,
        thickness: 5,
        image: 'images/produkciya/ugolki/50х50х5-2-optimized.webp',
        priceTo100: 23.10,
        priceTo500: 21.56,
        priceTo1000: 20.02,
        priceMin: 20.02,
        description: 'Максимальная защита для тяжёлых промышленных грузов.'
      },
      {
        id: 1370,
        article: 1120,
        title: 'Уголок защитный картонный 100x100x3 мм',
        width: 100,
        thickness: 3,
        image: 'images/produkciya/ugolki/100х100х3-2-optimized.webp',
        priceTo100: 27.00,
        priceTo500: 25.2,
        priceTo1000: 23.4,
        priceMin: 23.4,
        description: 'Широкий уголок для защиты крупных паллет и строительных материалов.'
      },
      {
        id: 1371,
        article: 1121,
        title: 'Уголок защитный картонный 100x100x4 мм',
        width: 100,
        thickness: 4,
        image: 'images/produkciya/ugolki/100х100х4-2-optimized.webp',
        priceTo100: 38.70,
        priceTo500: 36.12,
        priceTo1000: 33.54,
        priceMin: 33.54,
        description: 'Усиленная защита для сверхтяжёлых грузов и многоярусных паллет.'
      },
      {
        id: 1372,
        article: 1122,
        title: 'Уголок защитный картонный 100x100x5 мм',
        width: 100,
        thickness: 5,
        image: 'images/produkciya/ugolki/100х100х5-2-optimized.webp',
        priceTo100: 50.40,
        priceTo500: 47.04,
        priceTo1000: 43.68,
        priceMin: 43.68,
        description: 'Максимальная прочность для самых сложных условий транспортировки.'
      },
      {
        id: 2683,
        article: 1123,
        title: 'Уголок защитный картонный 100x100x6 мм',
        width: 100,
        thickness: 6,
        image: 'images/produkciya/ugolki/100х100х6-optimized.webp',
        priceTo100: 62.10,
        priceTo500: 57.96,
        priceTo1000: 53.82,
        priceMin: 53.82,
        description: 'Сверхпрочный уголок для особо тяжёлых грузов и металлопроката.'
      }
    ],
    fluting: [
      {
        id: 'fluting-1',
        article: 2001,
        title: 'Бумага для гофрирования (флютинг)',
        image: 'images/produkciya/kraft-bumaga/kraft.webp',
        density: '70–140 г/м²',
        width: '1575 мм',
        rollWeight: 'до 900 кг',
        description: 'Бумага для гофрирования (флютинг) – это высококачественный сырьевой материал, используемый для производства гофрированного картона. Она придаёт упаковке прочность, амортизационные свойства и устойчивость к деформации. Изготавливается из целлюлозы и макулатуры, обеспечивая экологичность и надёжность.',
        priceMin: 0
      }
    ],
    liner: [
      {
        id: 'liner-1',
        article: 2002,
        title: 'Картон для плоских слоев гофрокартона (лайнер)',
        image: 'images/produkciya/karton/KARTON.webp',
        density: '80–150 г/м²',
        width: '1575 мм',
        rollWeight: 'до 900 кг',
        description: 'Картон для плоских слоев гофрокартона (лайнер) – это листовой материал, используемый для наружных и внутренних слоёв гофрированного картона. Обеспечивает высокую жёсткость, отличные печатные свойства и устойчивость к механическим нагрузкам. Идеально подходит для производства транспортной и потребительской упаковки.',
        priceMin: 0
      }
    ]
  }
};