module.exports = (app) => {
    app.get('/', (req, res, rext) => {
        req.status(200).send("Home");
    })

    app.use('/games', require('./game.route.handler'));

    // Catch all
    app.use('*', (req, res, next) => {
        res.status(404).json({err: "Path" + req.originalUrl 
				+ " does not exist"});
    });
}