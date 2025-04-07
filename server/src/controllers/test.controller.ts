import { Request, Response } from 'express'

export const test = async (req: Request, res: Response) => {
  console.log('hi')
  res.status(200).send('Test route works!')
}
