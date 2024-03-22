import  express from 'express';
const router = express.Router();
import Freecurrencyapi from '@everapi/freecurrencyapi-js';


router.get('/', (req, res) => {
    const { from, to } = req.body
    const freecurrencyapi = new Freecurrencyapi(process.env.CURRENCY_API);
    freecurrencyapi.latest({
        base_currency: from,
        currencies: to
    }).then(resp => {
        res.status(201).json({message: resp})
    }).catch((err) => res.status(400).json({error: err.error}))
})

export default  router;
