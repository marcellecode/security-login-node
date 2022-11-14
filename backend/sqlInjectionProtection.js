const { sqlInjectionPayload } = require("./sqlInjectionPayload");

module.exports = {
    sqlInjectionProtection: function sqlInjectionProtection(user, pass) {
        const payload = sqlInjectionPayload();
        return payload.filter(el => el.includes(user) || el.includes(pass));
    },
  };
  