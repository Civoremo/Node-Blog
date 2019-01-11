
module.exports = (req, res, next) => {
    const { names } = res;
    const Uuser = names.map(user => ({...user, name: user.name.toUpperCase()}));

    res.status(200).json(Uuser);
    next();
};