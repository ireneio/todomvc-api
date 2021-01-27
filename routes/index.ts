import express, { Router, Request, Response } from "express"
const router: Router = express.Router()

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function): void {
  res.send('Server Running!')
})

/* GET server health. */
router.get('/health', function(req: Request, res: Response, next: Function): void {
  res.send('Server Running!')
})

export default router
