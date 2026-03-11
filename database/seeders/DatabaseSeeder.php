<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call all required seeders
        $this->call([
            SectorSeeder::class,
            // Add more seeders here as you build the project
        ]);

        // Optional: create a test user (you can modify or remove this)
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}