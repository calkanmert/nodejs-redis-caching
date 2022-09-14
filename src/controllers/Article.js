async function index(req, res) {
  res.render('index');
}

function newArticle(req, res) {
  res.json(req.body);
}

module.exports = {
  index,
  newArticle,
};
