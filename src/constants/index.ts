import { Prisma, Genre } from '@prisma/client'

export const GENRES: Genre[] = [
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

export const SALARY_RANGES: Prisma.SalaryRangeCreateInput[] = [
  {
    min: 800,
    max: 1200
  },
  {
    min: 1200,
    max: 1500
  },
  {
    min: 1500,
    max: 2000
  },
  {
    min: 2000
  },
]