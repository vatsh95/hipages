import * as express from 'express';
import * as db from '../inc/db';

var router = express.Router();

router.get('/', async (req, res, next) => {
    let respData: any = await db.executeMySqlQuery(`
        SELECT 
            hipages.jobs.*,
            hipages.categories.name as 'category_name',
            hipages.suburbs.name as 'suburb_name',
            hipages.suburbs.postcode as 'postcode'
        FROM hipages.jobs
        LEFT JOIN hipages.categories ON hipages.categories.id = hipages.jobs.category_id
        LEFT JOIN hipages.suburbs ON hipages.suburbs.id = hipages.jobs.suburb_id
        WHERE hipages.jobs.status = "new";
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

router.post('/status/:jobId', async function (req, res) {
    if (
        Number.isInteger(req.params.jobId)
        && 'status' in req.body
        && (req.body.status === 'accepted' || req.body.status === 'declined')
    ) {
        let respData: any = await db.executeMySqlQuery(
            `
                UPDATE hipages.jobs
                SET hipages.jobs.status = ?
                WHERE hipages.jobs.id = ?
            `,
            [req.body.status, req.params.jobId]
        );
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
    }

    res.send({
        error: true,
        data: "Invalid Request"
    });
});

export default router;