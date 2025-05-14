export const BLOCK_TYPES = {
  HERO: "HERO",
  ABOUT: "ABOUT",
  PROFESSORS: "PROFESSORS",
  CURRICULUM: "CURRICULUM",
  REVIEWS: "REVIEWS",
  CAREER: "CAREER",
  GALLERY: "GALLERY",
  ADMISSION: "ADMISSION",
  MIN_SCORES: "min_scores",
  PASS_SCORES: "pass_scores",
  OLYMPIADS: "olympiads",
  OPEN_DAY: "open_day",
};

export const BLOCK_TYPE_MAP = {
  [BLOCK_TYPES.HERO]: 1,
  [BLOCK_TYPES.ABOUT]: 2,
  [BLOCK_TYPES.PROFESSORS]: 3,
  [BLOCK_TYPES.CURRICULUM]: 4,
  [BLOCK_TYPES.REVIEWS]: 5,
  [BLOCK_TYPES.CAREER]: 6,
  [BLOCK_TYPES.GALLERY]: 7,
  [BLOCK_TYPES.ADMISSION]: 8,
  [BLOCK_TYPES.MIN_SCORES]: 9,
  [BLOCK_TYPES.PASS_SCORES]: 10,
  [BLOCK_TYPES.OLYMPIADS]: 11,
  [BLOCK_TYPES.OPEN_DAY]: 12,
};

export const BLOCK_OPTIONS = [
  { value: BLOCK_TYPES.HERO, label: "Начальный блок" },
  { value: BLOCK_TYPES.ABOUT, label: "О программе" },
  { value: BLOCK_TYPES.PROFESSORS, label: "Преподаватели" },
  { value: BLOCK_TYPES.CURRICULUM, label: "Учебный план" },
  { value: BLOCK_TYPES.REVIEWS, label: "Отзывы" },
  { value: BLOCK_TYPES.CAREER, label: "Карьера" },
  { value: BLOCK_TYPES.GALLERY, label: "Галерея" },
  { value: BLOCK_TYPES.ADMISSION, label: "Для абитуриента" },
  { value: BLOCK_TYPES.MIN_SCORES, label: "Минимальные баллы" },
  { value: BLOCK_TYPES.PASS_SCORES, label: "Проходные баллы" },
  { value: BLOCK_TYPES.OLYMPIADS, label: "Олимпиады" },
  { value: BLOCK_TYPES.OPEN_DAY, label: "День открытых дверей" },
];
