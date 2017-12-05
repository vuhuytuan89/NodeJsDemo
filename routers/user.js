module.exports = function(app) {  
    app.route('/user')
        .get(function (req, res) {
            res.send('Get user!');
        })
        .post(function (req, res) {
            res.send('Got a POST request');
        })
        .put(function (req, res) {
            res.send('Got a PUT request at /user');
        })
        .delete(function (req, res) {
            res.send('Got a DELETE request at /user');
        })
}