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
		// Bootstrap methods that need to be executed before account creation
		await strapi.admin.services.permission.cleanPermissionInDatabase();
		await strapi.admin.services.permission.ensureBoundPermissionsInDatabase();
		await strapi.admin.services.user.migrateUsers();
		await strapi.admin.services.role.createRolesIfNoneExist();
		await strapi.admin.services.role.resetSuperAdminPermissions();

	// Load default account credentials (stored in .env)
	let admin_creds = {
		username: process.env.ADMIN_USERNAME,
		email: process.env.ADMIN_EMAIL,
		password: process.env.ADMIN_PASSWORD
	};

	// Get super admin role for admin panel
	let super_admin_role = await strapi.admin.services.role.getSuperAdmin();
	// Get "authenticated" role for user API access
	let api_auth_role = await strapi.query('role', 'users-permissions').findOne({type: 'authenticated'});

	// Check if admin account exists
	const admin_exists = await strapi.admin.services.user.exists({email: admin_creds.email});

	if (!admin_exists) // Create default admin user
	{
		console.log('\nNOTE! Default admin user appears to be missing. Creating account now...')
		// Create admin login
		let new_admin = await strapi.admin.services.user.create({
			registrationToken: null,
			isActive: true,
			roles: [super_admin_role.id],
			...admin_creds,
    	});
		// Create API user permission (needed for /auth/local authentication)
		let admin_perm = 	await strapi.plugins['users-permissions'].services.user.add({
				confirmed: true,
				blocked: false,
				provider: 'local',
				role: api_auth_role.id,
				...admin_creds,
			});
			// Update permissions for "authenticated" role to have full API access
			const permissions = await strapi.query("permission", "users-permissions").find({ type: "application", role: api_auth_role.id });
			await Promise.all(
				permissions.map(p =>
					strapi.query("permission", "users-permissions").update({ id: p.id }, { enabled: true })
				)
			);
				if(new_admin && admin_perm) {
			console.log(`Success! You can now log into the Strapi admin portal with the following credentials:\nEmail: ${admin_creds.email}\nPassword: ${admin_creds.password}\n`);
		}
	}
	admin_creds = null;
};
