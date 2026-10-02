import { Meal, WorkoutDay, GroceryItem } from '../types';

export const DAILY_TARGET_MACROS = {
  calories: 2840,
  protein: 160,
  fat: 64,
  carbs: 398,
};

export const INITIAL_MEALS: Meal[] = [
  {
    id: 'breakfast',
    title: 'Завтрак: Power-овсянка',
    subtitle: 'Быстрый анаболический старт дня',
    calories: 769,
    macros: {
      calories: 769,
      protein: 32,
      fat: 24,
      carbs: 104,
    },
    ingredients: [
      {
        id: 'oats',
        name: 'Овсянка мелкая/нежная (Haferflocken zart)',
        grams: '100 г',
        measure: '1 полная кружка 250 мл',
      },
      {
        id: 'milk',
        name: 'Молоко 1.5% (H-Milch)',
        grams: '200 мл',
        measure: '4/5 кружки 250 мл',
      },
      {
        id: 'pb',
        name: 'Арахисовая паста (Erdnussbutter)',
        grams: '20 г',
        measure: '1 ст. л. с хорошим верхом',
      },
      {
        id: 'banana',
        name: 'Свежий банан',
        grams: '~120 г',
        measure: '1 средний банан (калий против отеков)',
      },
      {
        id: 'toast',
        name: 'Цельнозерновой тост (Vollkorn Toast)',
        grams: '30 г',
        measure: '1 ломтик (подсушить в тостере)',
      },
    ],
    recipe: 'В глубокую тарелку насыпать 100 г овсянки, залить 200 мл молока. Поставить в микроволновку на 2.5 минуты на средней мощности. В горячую кашу сразу вмешать 1 ст. л. арахисовой пасты (она мгновенно тает и дает кремовую текстуру). Нарезать банан сверху. Рядом хрустящий тост.',
    specialNote: 'Идеальный баланс медленных углеводов и полезных жиров. Не требует весов — кружка и ложка.',
  },
  {
    id: 'lunch',
    title: 'Обед: Курица, рис, овощи + Творожный десерт',
    subtitle: 'Главный ударный прием калорий и белка',
    calories: 1112,
    macros: {
      calories: 1112,
      protein: 74,
      fat: 20,
      carbs: 154,
    },
    hasTunaAlternative: true,
    ingredients: [
      {
        id: 'chicken',
        name: 'Куриное филе (Hähnchenbrustfilet)',
        grams: '200 г сырого',
        measure: '1/5 лотка 1 кг (кусок ровно с ладонь)',
        alternative: 'В дни без курицы: 1 банка тунца в с/с (130 г)',
      },
      {
        id: 'rice',
        name: 'Рис длиннозерный сухой (Reis Langkorn)',
        grams: '130 г сухой',
        measure: '~2/3 кружки 250 мл (на выходе ~350 г)',
      },
      {
        id: 'veggies_lunch',
        name: 'Замороженные овощи (TK Kaisergemüse)',
        grams: '150 г',
        measure: '2 полные горсти',
      },
      {
        id: 'oil_lunch',
        name: 'Растительное/рапсовое масло (Rapsöl)',
        grams: '10 г',
        measure: '1 столовая ложка для сковороды',
      },
      {
        id: 'dessert',
        name: 'Десерт: Magerquark + молоко + банан',
        grams: '200 г творога + 100 мл молока + 1 банан',
        measure: 'Чуть меньше 1/2 пачки 500г творога, взбить вилкой 30 сек',
      },
    ],
    recipe: '1. Рис залить 2 объёмами кипятка, варить 12-15 мин.\n2. Филе нарезать соломкой, обжарить на 1 ст. л. масла с 2 горстями овощей (8-10 мин).\n3. Десерт: 200 г нежирного творога (Magerquark) выложить в пиалу, добавить 100 мл молока и размятый банан. Взбить вилкой за 30 секунд до нежного крема.',
    specialNote: 'Если вместо курицы берете тунец — обязательно слейте рассол и промойте холодной водой, чтобы убрать избыток натрия.',
  },
  {
    id: 'dinner',
    title: 'Ужин: Паста со скрэмблом, фасолью и тостами',
    subtitle: 'Плотное восстановление гликогена перед сном',
    calories: 962,
    macros: {
      calories: 962,
      protein: 54,
      fat: 20,
      carbs: 140,
    },
    ingredients: [
      {
        id: 'pasta',
        name: 'Макароны твердых сортов (Penne/Spaghetti)',
        grams: '125 г сухих',
        measure: 'Ровно 1/4 пачки 500 г (легко отмерить на глаз)',
      },
      {
        id: 'eggs',
        name: 'Куриные яйца (Eier Kl. M)',
        grams: '2 шт.',
        measure: '2 цельных яйца',
      },
      {
        id: 'beans',
        name: 'Красная фасоль (Kidneybohnen)',
        grams: '80 г',
        measure: '3 столовые ложки (ПРОМЫТЬ от рассола!)',
      },
      {
        id: 'veggies_dinner',
        name: 'Овощи замороженные/свежие',
        grams: '100 г',
        measure: '1 плотная горсть',
      },
      {
        id: 'dinner_toasts',
        name: 'Тосты с арахисовой пастой',
        grams: '2 шт. + 10 г пасты',
        measure: '2 ломтика с 1 ч. л. арахисовой пасты (тонкий слой)',
      },
    ],
    recipe: '1. Сварить 125 г пасты в подсоленной воде 8-9 мин аль денте.\n2. На сковороду отправить фасоль (промытую) и горсть овощей, залить 2 взбитыми яйцами, перемешать лопаткой за 2 минуты (скрэмбл).\n3. Смешать скрэмбл с пастой.\n4. Сделать 2 тоста, слегка смазать тонким слоем арахисовой пасты (10 г).',
    specialNote: '⚠️ Спец-заметка: не есть за 1.5 часа до сна, чтобы не было утренней отечности и тяжести.',
  },
];

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'monday',
    dayShort: 'Пн',
    dayFull: 'Понедельник',
    title: 'День А: База',
    description: 'Фокус на базовые многосуставные движения всего тела',
    exercises: [
      {
        id: 'ex_split_squat',
        name: 'Сплит-приседы (выпады на месте)',
        equipment: 'Гантели 2x10 кг',
        setsCount: 4,
        targetReps: '8–10 на ногу',
        safetyTip: 'Спину держи строго вертикально, колено передней ноги не заваливай внутрь, упор в пятку.',
        safetyRules: [
          'Вертикальный корпус: не наклоняй грудь к переднему бедру, сохраняй нейтраль в пояснице.',
          'Упор в переднюю пятку: колено не выходит за носок более чем на 2-3 см, защищая связки.'
        ],
        movementSvgType: 'split_squat',
        sets: [
          { id: 1, completed: false, reps: '8-10' },
          { id: 2, completed: false, reps: '8-10' },
          { id: 3, completed: false, reps: '8-10' },
          { id: 4, completed: false, reps: '8-10' },
        ],
      },
      {
        id: 'ex_floor_press',
        name: 'Жим штанги с пола (Floor Press)',
        equipment: 'Штанга 30 кг',
        setsCount: 4,
        targetReps: '8–12',
        safetyTip: 'Локти касаются пола под углом 45-60° к корпусу, пауза полсекунды внизу без удара локтями.',
        safetyRules: [
          'Полная фиксация лопаток: лопатки сведены и вжаты в пол, поясница прижата или в естественном легком прогибе.',
          'Мягкое касание трицепсом пола: исключи удар локтями о бетон, задержись на 0.5 сек в нижней точке.'
        ],
        movementSvgType: 'floor_press',
        sets: [
          { id: 1, completed: false, reps: '8-12' },
          { id: 2, completed: false, reps: '8-12' },
          { id: 3, completed: false, reps: '8-12' },
          { id: 4, completed: false, reps: '8-12' },
        ],
      },
      {
        id: 'ex_bent_row',
        name: 'Тяга штанги в наклоне к поясу',
        equipment: 'Штанга 30 кг',
        setsCount: 4,
        targetReps: '10–12',
        safetyTip: 'Наклон 45-60°, таз назад, поясница зафиксирована в легком прогибе. Тяни локтями к низу живота.',
        safetyRules: [
          'Таз назад + жесткий кор: никогда не горби грудной отдел, угол наклона фиксирован на протяжении всего сета.',
          'Тяга локтями к паху: веди гриф строго вдоль бедер к поясу, сводя лопатки без рывков поясницей.'
        ],
        movementSvgType: 'bent_row',
        sets: [
          { id: 1, completed: false, reps: '10-12' },
          { id: 2, completed: false, reps: '10-12' },
          { id: 3, completed: false, reps: '10-12' },
          { id: 4, completed: false, reps: '10-12' },
        ],
      },
      {
        id: 'ex_lateral_raise',
        name: 'Махи гантелями в стороны стоя',
        equipment: 'Гантели 10 кг',
        setsCount: 3,
        targetReps: '12–15',
        safetyTip: 'Локти чуть согнуты и смотрят вверх-назад, без рывка спиной. Поднимай до уровня плеч.',
        safetyRules: [
          'Изоляция без раскачки: колени слегка пружинят, корпус неподвижен, исключи толчок поясницей.',
          'Локти выше кистей: мизинец смотрит чуть вверх в верхней точке, не задирай гантели выше плеч.'
        ],
        movementSvgType: 'lateral_raise',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_biceps_curl',
        name: 'Подъем на бицепс',
        equipment: 'Штанга 30 кг / Гантели 10 кг',
        setsCount: 3,
        targetReps: '8–10',
        safetyTip: 'Локти прижаты к ребрам, не выводи локти вперед и не раскачивай корпус.',
        safetyRules: [
          'Локти прижаты к корпусу: точка вращения неподвижна, исключи вывод плеч вперед.',
          'Нейтральный позвоночник: сожми пресс и ягодицы, никакого откидывания назад в верхней точке.'
        ],
        movementSvgType: 'biceps_curl',
        sets: [
          { id: 1, completed: false, reps: '8-10' },
          { id: 2, completed: false, reps: '8-10' },
          { id: 3, completed: false, reps: '8-10' },
        ],
      },
    ],
  },
  {
    id: 'wednesday',
    dayShort: 'Ср',
    dayFull: 'Среда',
    title: 'День Б: Задняя цепь и плечи',
    description: 'Бицепс бедра, ягодичные, дельты и грудные',
    exercises: [
      {
        id: 'ex_romanian_dl',
        name: 'Румынская тяга (RDL)',
        equipment: 'Штанга 30 кг',
        setsCount: 4,
        targetReps: '12–15',
        safetyTip: 'Критично для спины: колени чуть согнуты, движение идет исключительно за счет отведения таза назад.',
        safetyRules: [
          'Таз строго назад (Hip Hinge): колени не сгибаются глубже 20°, гриф буквально скользит по передней поверхности бедер.',
          'Прямая спина в одной струне: шея продолжает позвоночник (взгляд в пол в 2 метрах перед собой).'
        ],
        movementSvgType: 'romanian_dl',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
          { id: 4, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_overhead_press',
        name: 'Армейский жим штанги стоя',
        equipment: 'Штанга 30 кг',
        setsCount: 4,
        targetReps: '8–10',
        safetyTip: 'Жестко сожми ягодицы и напряги пресс, чтобы исключить опасный прогиб в пояснице.',
        safetyRules: [
          '«Ягодичный замок»: максимально сожми ягодицы перед началом жима, это блокирует переразгибание поясницы.',
          'Вертикальная ось: в верхней точке штанга строго над центром тяжести (над затылком), голова подается вперед.'
        ],
        movementSvgType: 'overhead_press',
        sets: [
          { id: 1, completed: false, reps: '8-10' },
          { id: 2, completed: false, reps: '8-10' },
          { id: 3, completed: false, reps: '8-10' },
          { id: 4, completed: false, reps: '8-10' },
        ],
      },
      {
        id: 'ex_db_row',
        name: 'Тяга гантели 10 кг с упором',
        equipment: 'Гантель 10 кг + опора',
        setsCount: 4,
        targetReps: '12–15 на сторону',
        safetyTip: 'Упор рукой в опору/колено защищает позвоночник. Тяни гантель к бедру по дуге.',
        safetyRules: [
          'Треугольник опоры: упорная рука и колено принимают 50% нагрузки, полностью разгружая межпозвоночные диски.',
          'Траектория дуги к тазу: тяни гантель не к груди, а к карману брюк, максимально растягивая низ широчайшей.'
        ],
        movementSvgType: 'db_row',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
          { id: 4, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_pushups_paused',
        name: 'Отжимания от пола с паузой внизу',
        equipment: 'Собственный вес',
        setsCount: 3,
        targetReps: '12–15',
        safetyTip: 'Тело в одну прямую линию, пауза 1 секунда в 2 см от пола.',
        safetyRules: [
          'Прямая линия таз-пятки: не допускай провисания живота вниз, держи кор в напряжении планки.',
          'Угол локтей 45°: локти не расставляются в стороны «буквой Т», сохраняя здоровье ротаторной манжеты.'
        ],
        movementSvgType: 'pushups',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_french_press',
        name: 'Французский жим из-за головы',
        equipment: 'Гантель 10 кг двумя руками',
        setsCount: 3,
        targetReps: '12–15',
        safetyTip: 'Локти направлены вперед и не разъезжаются в стороны. Контролируй опускание.',
        safetyRules: [
          'Фиксация плечевой кости: локти смотрят строго в потолок и прижаты ближе к ушам.',
          'Контролируемая негативная фаза: опускай гантель 2 секунды, без удара по шее или затылку.'
        ],
        movementSvgType: 'french_press',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
        ],
      },
    ],
  },
  {
    id: 'friday',
    dayShort: 'Пт',
    dayFull: 'Пятница',
    title: 'День В: Объем и руки',
    description: 'Квадрицепсы, ягодичный массив, трицепс, бицепс и кор',
    exercises: [
      {
        id: 'ex_goblet_squat',
        name: 'Кубковые приседания (Goblet Squat)',
        equipment: 'Гантель 10 кг вертикально у груди',
        setsCount: 4,
        targetReps: '15–20',
        safetyTip: 'Гантель прижата к грудине, колени разводи по направлению носков.',
        safetyRules: [
          'Гантель как противовес: прижата к грудине, что естественным образом держит грудной отдел раскрытым.',
          'Колени наружу: разводи бедра шире таза в нижней точке, сохраняя нейтраль в поясничном отделе.'
        ],
        movementSvgType: 'goblet_squat',
        sets: [
          { id: 1, completed: false, reps: '15-20' },
          { id: 2, completed: false, reps: '15-20' },
          { id: 3, completed: false, reps: '15-20' },
          { id: 4, completed: false, reps: '15-20' },
        ],
      },
      {
        id: 'ex_hip_thrust',
        name: 'Ягодичный мостик со штангой',
        equipment: 'Штанга 30 кг (полотенце под гриф)',
        setsCount: 4,
        targetReps: '12–15',
        safetyTip: 'В верхней точке задержись на 2 секунды с полным сжатием ягодиц. Подбородок к груди.',
        safetyRules: [
          'Подбородок к груди: смотри на свой пупок на протяжении всего движения, не запрокидывай голову назад.',
          'Движение за счет таза, а не поясницы: не переразгибай поясницу выше нейтрали, жми пятками в пол.'
        ],
        movementSvgType: 'hip_thrust',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
          { id: 4, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_close_grip_pushups',
        name: 'Отжимания узким хватом',
        equipment: 'Собственный вес (акцент трицепс)',
        setsCount: 3,
        targetReps: '12–15',
        safetyTip: 'Кисти на ширине плеч, локти скользят строго вдоль ребер.',
        safetyRules: [
          'Локти трутся о ребра: при опускании локти направлены строго назад вдоль корпуса.',
          'Пресс в постоянном тонусе: удерживай таз на одной линии с плечами без прогиба в пояснице.'
        ],
        movementSvgType: 'pushups_close',
        sets: [
          { id: 1, completed: false, reps: '12-15' },
          { id: 2, completed: false, reps: '12-15' },
          { id: 3, completed: false, reps: '12-15' },
        ],
      },
      {
        id: 'ex_hammer_curls',
        name: 'Молотковые сгибания (Молот)',
        equipment: 'Гантели 10 кг',
        setsCount: 3,
        targetReps: '10–12',
        safetyTip: 'Нейтральный хват (ладони смотрят друг на друга). Качает брахиалис.',
        safetyRules: [
          'Нейтральный хват: пальцы обращены внутрь к телу, минимизируя нагрузку на связки предплечья.',
          'Без инерции: опускай гантели подконтрольно, не используй раскачку корпуса вперед-назад.'
        ],
        movementSvgType: 'hammer_curl',
        sets: [
          { id: 1, completed: false, reps: '10-12' },
          { id: 2, completed: false, reps: '10-12' },
          { id: 3, completed: false, reps: '10-12' },
        ],
      },
      {
        id: 'ex_plank',
        name: 'Планка на предплечьях',
        equipment: 'Собственный вес',
        setsCount: 3,
        targetReps: '60 сек',
        safetyTip: 'Втягивай пупок внутрь, напрягай ягодицы. Никакого провисания в пояснице!',
        safetyRules: [
          'Задний наклон таза: подкрути таз на себя, исключая прогиб поясницы к полу.',
          'Локти под плечами: активное отталкивание предплечьями от пола, разводя лопатки в стороны.'
        ],
        movementSvgType: 'plank',
        sets: [
          { id: 1, completed: false, reps: '60 сек' },
          { id: 2, completed: false, reps: '60 сек' },
          { id: 3, completed: false, reps: '60 сек' },
        ],
      },
    ],
  },
];

export const GROCERY_ITEMS: GroceryItem[] = [
  { id: 'g1', name: 'Куриное филе (грудка)', russianName: 'Куриное филе (грудка)', germanName: 'Hähnchenbrustfilet', quantity: '1 упаковка (1 кг)', defaultPrice: 7.99, category: 'meat', iconKey: 'chicken', completed: false },
  { id: 'g2', name: 'Творог обезжиренный 0.2%', russianName: 'Творог обезжиренный 0.2%', germanName: 'Magerquark', quantity: '4 пачки по 500г (2 кг)', defaultPrice: 5.96, category: 'dairy', iconKey: 'quark', completed: false },
  { id: 'g3', name: 'Яйца куриные кат. M', russianName: 'Яйца куриные кат. M', germanName: 'Eier Bodenhaltung Kl. M', quantity: '2 лотка по 10 шт (20 шт)', defaultPrice: 3.98, category: 'dairy', iconKey: 'eggs', completed: false },
  { id: 'g4', name: 'Пастеризованное молоко 1.5%', russianName: 'Пастеризованное молоко 1.5%', germanName: 'H-Milch 1.5%', quantity: '4 упаковки по 1 л', defaultPrice: 3.96, category: 'dairy', iconKey: 'milk', completed: false },
  { id: 'g5', name: 'Замороженные овощи микс', russianName: 'Замороженные овощи микс', germanName: 'TK Kaisergemüse', quantity: '2 пакета по 1 кг', defaultPrice: 3.58, category: 'veggies', iconKey: 'veggies', completed: false },
  { id: 'g6', name: 'Красная фасоль в с/с', russianName: 'Красная фасоль в с/с', germanName: 'Kidneybohnen', quantity: '4 банки по 400г', defaultPrice: 3.40, category: 'carbs', iconKey: 'beans', completed: false },
  { id: 'g7', name: 'Свежие бананы', russianName: 'Свежие бананы', germanName: 'Bananen', quantity: '~2.1 кг (~14 шт, калий)', defaultPrice: 3.13, category: 'veggies', iconKey: 'banana', completed: false },
  { id: 'g8', name: 'Длиннозерный рис', russianName: 'Длиннозерный рис', germanName: 'Reis Langkorn', quantity: '2 пачки по 1 кг', defaultPrice: 2.98, category: 'carbs', iconKey: 'rice', completed: false },
  { id: 'g9', name: 'Макароны твердых сортов (Пенне)', russianName: 'Макароны твердых сортов (Пенне)', germanName: 'Nudeln Penne', quantity: '3 пачки по 500г', defaultPrice: 2.37, category: 'carbs', iconKey: 'pasta', completed: false },
  { id: 'g10', name: 'Овсяные хлопья нежные', russianName: 'Овсяные хлопья нежные', germanName: 'Haferflocken zart', quantity: '3 пачки по 500г', defaultPrice: 2.37, category: 'carbs', iconKey: 'oats', completed: false },
  { id: 'g11', name: 'Тунец в собственном соку', russianName: 'Тунец в собственном соку', germanName: 'Thunfisch in eigenem Saft', quantity: '2 банки по 185г', defaultPrice: 2.38, category: 'meat', iconKey: 'tuna', completed: false },
  { id: 'g12', name: 'Арахисовая паста без сахара', russianName: 'Арахисовая паста без сахара', germanName: 'Erdnussbutter creamy', quantity: '1 банка 350г', defaultPrice: 1.99, category: 'other', iconKey: 'peanut_butter', completed: false },
  { id: 'g13', name: 'Цельнозерновой тостовый хлеб', russianName: 'Цельнозерновой тостовый хлеб', germanName: 'Vollkorn Toastbrot', quantity: '2 упаковки по 500г', defaultPrice: 1.98, category: 'carbs', iconKey: 'toast', completed: false },
  { id: 'g14', name: 'Свежие яблоки', russianName: 'Свежие яблоки', germanName: 'Äpfel', quantity: '1 пакет (1.5 кг)', defaultPrice: 1.99, category: 'veggies', iconKey: 'apple', completed: false },
  { id: 'g15', name: 'Рапсовое / подсолнечное масло', russianName: 'Рапсовое / подсолнечное масло', germanName: 'Rapsöl', quantity: '1 бутылка (1 л)', defaultPrice: 1.69, category: 'other', iconKey: 'oil', completed: false },
];

export const TOTAL_GROCERY_BUDGET = 50.00;
export const TARGET_GROCERY_SUM = 49.75;

export const ANTI_BLOATING_TIPS = [
  {
    id: 1,
    title: 'Промывай фасоль и тунец холодной водой',
    badge: '-40% скрытой соли',
    desc: 'Рассол консервов содержит ударную дозу натрия, который притягивает воду прямо под кожу лица. Откинь фасоль на дуршлаг и промой 20 секунд под краном.',
    icon: 'droplets',
  },
  {
    id: 2,
    title: '80% воды строго до 18:30',
    badge: 'Ночной покой почек',
    desc: 'Выпивай основной объем (2400 мл из 3000 мл) в первой половине дня. После 19:00 — максимум пара глотков при жажде, чтобы проснуться со свежим лицом без мешков.',
    icon: 'clock',
  },
  {
    id: 3,
    title: 'Калий из бананов выводит подкожную воду',
    badge: 'Вода в мышцы, а не в лицо',
    desc: 'Бананы в рационе богаты калием. Калий активирует натрий-калиевый насос: вытесняет воду из подкожно-жирового слоя внутрь мышечных клеток, заполняя гликоген.',
    icon: 'zap',
  },
  {
    id: 4,
    title: 'Сон на спине или приподнятая подушка',
    badge: 'Лимфодренаж головы',
    desc: 'Сон лицом в подушку пережимает лимфатические протоки шеи. Спи на спине или добавь анатомическую подушку — гравитация сама обеспечит идеальный отток жидкости.',
    icon: 'moon',
  },
];
