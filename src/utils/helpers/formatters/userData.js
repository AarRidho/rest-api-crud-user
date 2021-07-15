module.exports = (user) => {
    const { _id, email, username, role } = user;

    return { id: _id, email, username, role };
};