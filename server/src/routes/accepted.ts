import * as express from 'express';
import * as db from '../inc/db';
var router = express.Router();

/**
 * Sends all the accepted leads
*/
router.get('/', async (req, res, next) => {
    try {
        let respData: any = await db.executeMySqlQuery(`
            SELECT 
                hipages.jobs.*,
                hipages.categories.name as 'category_name',
                hipages.suburbs.name as 'suburb_name',
                hipages.suburbs.postcode as 'postcode'
            FROM hipages.jobs
            LEFT JOIN hipages.categories ON hipages.categories.id = hipages.jobs.category_id
            LEFT JOIN hipages.suburbs ON hipages.suburbs.id = hipages.jobs.suburb_id
            WHERE hipages.jobs.status = "accepted";
        `);
        res.send(respData);
    } catch (error) {
        res.send({
            error: true,
            data: "Database Error"
        });
    }
});

export default router;