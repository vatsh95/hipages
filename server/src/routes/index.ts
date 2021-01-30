import * as express from 'express';
import invitedRouter from './invited';
import acceptedRouter from './accepted';

var router = express.Router();

router.get('/', async (req, res, next) => {
    res.send({
        data: "Hello World"
    });
});

//split up routes to different files
router.use('/invited', invitedRouter);
router.use('/accepted', acceptedRouter);

export default router;