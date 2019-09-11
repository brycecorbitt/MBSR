'use strict';
const strapi = require('strapi')
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

 const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
 const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
 const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

 async function bootstrap_admin() {
  strapi.log.info(`Bootstrapping Admin`)
  let users = await strapi.plugins['users-permissions'].services.user.fetchAll()
  let admin_role = await strapi.plugins['users-permissions'].models.role.findOne({ type: 'root' }, ['users'])
  admin_role.type = 'root';
  admin_role.name = 'Administrator';

  var registered = false;

  users.forEach(user => {
    if(user.role && user.role.type == 'root'){
      strapi.log.info("Admin account already registered");
      registered = true;
      return;
    }
  })

  if(registered)
    return;

  let params = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    email: ADMIN_EMAIL,
    role: admin_role,
    confirmed: true,
    provider: 'local'
  }
  params.password = await strapi.plugins['users-permissions'].services.user.hashPassword(params)

  await strapi.plugins['users-permissions'].models.user.create(params);

  strapi.log.info("Created default Administrator account.")

}

module.exports = cb => {
  bootstrap_admin();
  cb();
};
