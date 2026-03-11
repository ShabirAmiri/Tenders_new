<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Member subtype: 'public' or 'acci' (null for buyers/admins)
            $table->string('member_subtype')->nullable()->after('role');
            
            // Common fields for buyers and members
            $table->string('phone')->nullable()->after('email');
            $table->string('organization_name')->nullable()->after('phone');
            $table->string('contact_person')->nullable()->after('organization_name');
            $table->string('position')->nullable()->after('contact_person');
            
            // Buyer-specific fields
            $table->string('organization_type')->nullable()->after('position');
            $table->string('registration_number')->nullable()->after('organization_type');
            $table->text('address')->nullable()->after('registration_number');
            $table->string('website')->nullable()->after('address');
            
            // ACCI member fields
            $table->string('gender')->nullable()->after('website'); // male, female, other
            $table->foreignId('sector_id')->nullable()->constrained('sectors')->nullOnDelete();
            $table->string('membership_tier')->nullable()->after('sector_id'); // VIP, Gold, Platinum, Entrepreneur
            $table->string('membership_id')->nullable()->unique()->after('membership_tier');
            $table->date('membership_issue_date')->nullable()->after('membership_id');
            $table->date('membership_expiry_date')->nullable()->after('membership_issue_date');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['sector_id']);
            $table->dropColumn([
                'member_subtype',
                'phone',
                'organization_name',
                'contact_person',
                'position',
                'organization_type',
                'registration_number',
                'address',
                'website',
                'gender',
                'sector_id',
                'membership_tier',
                'membership_id',
                'membership_issue_date',
                'membership_expiry_date',
            ]);
        });
    }
};