import * as express from 'express';
import * as db from '../inc/db';
var router = express.Router();

router.get('/', async (req, res, next) => {
    let respData: any = await db.executeMySqlQuery(`
        SELECT * FROM hipages.jobs
        LEFT JOIN hipages.categories ON hipages.categories.id = hipages.jobs.category_id
        LEFT JOIN hipages.suburbs ON hipages.suburbs.id = hipages.jobs.suburb_id
        WHERE hipages.jobs.status = "accepted";
    `);
    if (
        'error' in respData
        && respData.error === true
    ) {
        res.send({
            error: true,
            data: "Database Error"
        });
    } else {
        res.send(respData);
    }
});

export default router;