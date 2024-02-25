import prisma from '../src/lib/prisma';
import { BUSINESS_TYPES, GENRES, JOB_CATEGORIES, SALARY_RANGES } from '../src/constants'

const main = async () => {
  await prisma.$transaction(async (prisma) => {
    await prisma.genre.createMany({
      data: GENRES,
      skipDuplicates: true
    })
    await prisma.businessType.createMany({
      data: BUSINESS_TYPES,
      skipDuplicates: true
    })
    await prisma.jobCategory.createMany({ 
        data: JOB_CATEGORIES,
        skipDuplicates: true
    })
    await prisma.salaryRange.createMany({
      data: SALARY_RANGES,
      skipDuplicates: true
    })
    return
  })
}

main()