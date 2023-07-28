exports.renderErrorPage = (req, res, next) => {
    res.status(404).render('404',
        {
            docTitle: 'Error page',
            path: ''
        });
}