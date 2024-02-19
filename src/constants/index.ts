export const GENRES: {
  id: number;
  name: string;
}[] = [
  {
    id: 0,
    name: '仕事・キャリア',
  },
  {
    id: 1,
    name: '投資・資産運用',
  },
  {
    id: 2,
    name: 'お得・節税',
  },
  {
    id: 3,
    name: '結婚・出産・子育て',
  },
  {
    id: 4,
    name: '英語・学習',
  },
  {
    id: 5,
    name: '健康・美容',
  },
  {
    id: 6,
    name: 'ペット',
  },
  {
    id: 7,
    name: '趣味',
  },
  {
    id: 990,
    name: '雑談',
  },
  {
    id: 999,
    name: 'NeutroNet への改善要望',
  },
]

export const JOB_CATEGORIES: {
  id: number;
  name: string;
}[] = [
  {
    id: 0,
    name: 'エンジニア'
  },
  {
    id: 1,
    name: 'デザイナー'
  },
  {
    id: 2,
    name: '営業'
  },
  {
    id: 3,
    name: 'マーケティング'
  },
  {
    id: 4,
    name: '事務'
  },
  {
    id: 999,
    name: 'その他'
  },
]

export const SALARY_RANGES: {
  id: string;
  min: number;
  max?: number;
}[] = [
  {
    id: "theiGhu6lahSh4pa",
    min: 800,
    max: 1200
  },
  {
    id: "eeViegoo4ci2Dei0",
    min: 1200,
    max: 1500
  },
  {
    id: "Ephee7buXias0ahW",
    min: 1500,
    max: 2000
  },
  {
    id: "gielae5JohGhauph",
    min: 2000
  },
]

export const BUSINESS_TYPES: {
  id: number;
  name: string;
}[] = [
  {
    id: 0,
    name: '新卒'
  },
  {
    id: 1,
    name: '中途'
  },
  {
    id: 2,
    name: 'フリーランス'
  },
  {
    id: 3,
    name: '起業'
  },
  {
    id: 4,
    name: 'その他'
  },
]

export const TITLE_LENGTH = 50;
export const COMMENT_LENGTH = 1000;
export const THREADS_LIMIT = 10;
export const COMMENTS_LIMIT = 10;
export const NOTIFICATIONS_LIMIT = 10;
export const NAME_LEGNTH = 15;