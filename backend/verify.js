module.exports = {
  verify: function verify(user, pass) {
    const passDB =
      "6b96d27aff7e750bda5fecc70f9dc0ab315106e5ebcf39c2a44353645363e7e0";
    const userDB = "123";
    if (user && pass) {
      if (user === userDB && pass === passDB) {
        return 1;
      }
    }
  },
};
