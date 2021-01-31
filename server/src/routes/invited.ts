import * as express from 'express';
import * as db from '../inc/db';

var router = express.Router();

/**
 * Returns all Lead inviation related data
*/
router.get('/', async (req, res, next) => {
    try {
        let respData: any = await db.executeMySqlQuery(`
            SELECT 
                hipages.jobs.id,
                hipages.jobs.status,
                hipages.jobs.suburb_id,
                hipages.jobs.category_id,
                hipages.jobs.contact_name,
                hipages.jobs.price,
                hipages.jobs.description,
                hipages.jobs.created_at,
                hipages.jobs.updated_at,
                hipages.categories.name as 'category_name',
                hipages.suburbs.name as 'suburb_name',
                hipages.suburbs.postcode as 'postcode'
            FROM hipages.jobs
            LEFT JOIN hipages.categories ON hipages.categories.id = hipages.jobs.category_id
            LEFT JOIN hipages.suburbs ON hipages.suburbs.id = hipages.jobs.suburb_id
            WHERE hipages.jobs.status = "new";
        `);
        res.send(respData);
    } catch (error) {
        res.send({
            error: true,
            data: "Database Error"
        });
    }
});

/**
 * Updates a Lead Status to accepted or declined in the database
*/
router.post('/status/:jobId', async function (req, res) {
    if (
        req.params.jobId
        && 'status' in req.body
        && (req.body.status === 'accepted' || req.body.status === 'declined')
    ) {
        try {
            let respData: any = await db.executeMySqlQuery(
                `
                    UPDATE hipages.jobs
                    SET hipages.jobs.status = ?
                    WHERE hipages.jobs.id = ?
                `,
                [req.body.status, req.params.jobId]
            );
            res.send(respData);
        } catch (error) {
            res.send({
                error: true,
                data: "Database Error"
            });
        }
    }

    res.send({
        error: true,
        data: "Invalid Request"
    });
});

export default router;