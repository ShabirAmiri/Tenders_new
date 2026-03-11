<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sector; // <-- Add this line

class SectorSeeder extends Seeder
{
    public function run()
    {
        $sectors = [
            'Construction',
            'Information Technology',
            'Healthcare',
            'Education',
            'Agriculture',
            'Transportation',
            'Energy',
            'Finance',
            'Manufacturing',
            'Retail',
            'Services',
            'Other',
        ];

        foreach ($sectors as $sector) {
            Sector::create(['name' => $sector]);
        }
    }
}