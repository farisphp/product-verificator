<?php

namespace Database\Seeders;

use App\DefaultRole;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $superadmin = User::factory()->create([
            "name" => "Super Admin",
            "email" => "super@admin.com",
            "password" => "admin1234",
            "is_admin" => true,
        ]);

        // Reset cached roles and permissions
        app()[
            \Spatie\Permission\PermissionRegistrar::class
        ]->forgetCachedPermissions();

        // merchant detail permission
        Permission::create(["name" => "edit own merchants"]);

        // user permissions
        Permission::create(["name" => "add users"]);
        Permission::create(["name" => "delete users"]);
        Permission::create(["name" => "view users"]);
        Permission::create(["name" => "edit users"]);

        // product permissions
        Permission::create(["name" => "add products"]);
        Permission::create(["name" => "delete products"]);
        Permission::create(["name" => "view products"]);
        Permission::create(["name" => "edit products"]);

        // create roles and assign existing permissions
        $role1 = Role::create(["name" => DefaultRole::PRODUCT_ADMIN]);
        $role1->givePermissionTo(
            "add products",
            "view products",
            "edit products"
        );

        $role2 = Role::create(["name" => DefaultRole::GENERAL_ADMIN]);
        $role2->givePermissionTo(
            "add products",
            "view products",
            "edit products",
            "delete products",
            "add users",
            "view users",
            "edit users",
            "delete users",
            "edit own merchants"
        );
    }
}
