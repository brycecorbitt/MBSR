'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
	// Load default account credentials (stored in .env)
	let admin_creds = {
		username: process.env.ADMIN_USERNAME,
		email: process.env.ADMIN_EMAIL,
		password: process.env.ADMIN_PASSWORD
	};

	// Check if admin account exists
	const admin_exists = await strapi.admin.services.user.exists({email: admin_creds.email});

	if (!admin_exists) // Create default admin user
	{
		console.log('\nNOTE! Default admin user appears to be missing. Creating account now...')
		// Get ID of admin role to use in account creation
		let super_admin_role = await strapi.admin.services.role.getSuperAdminWithUsersCount();
		let attrs = Object.assign({isActive: true, roles: [super_admin_role.id]}, admin_creds);
		let new_admin = await strapi.admin.services.user.create(attrs);
		if(new_admin) {
			console.log(`Success! You can now log into the Strapi admin portal with the following credentials:\nEmail: ${admin_creds.email}\nPassword: ${admin_creds.password}\n`);
		}
	}
	admin_creds = null;
};
