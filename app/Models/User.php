<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Role constants
     */
    const ROLE_GUEST = 'guest';
    const ROLE_MEMBER = 'member';
    const ROLE_BUYER = 'buyer';
    const ROLE_ADMIN = 'admin';

    /**
     * Member subtypes
     */
    const MEMBER_SUBTYPE_PUBLIC = 'public';
    const MEMBER_SUBTYPE_ACCI = 'acci';

    /**
     * Membership tiers
     */
    const TIER_VIP = 'VIP';
    const TIER_GOLD = 'Gold';
    const TIER_PLATINUM = 'Platinum';
    const TIER_ENTREPRENEUR = 'Entrepreneur';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_approved',
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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_approved' => 'boolean',
            'membership_issue_date' => 'date',
            'membership_expiry_date' => 'date',
        ];
    }

    /**
     * Get the sector that the user belongs to.
     */
    public function sector()
    {
        return $this->belongsTo(Sector::class);
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * Check if user is a buyer.
     */
    public function isBuyer(): bool
    {
        return $this->role === self::ROLE_BUYER;
    }

    /**
     * Check if user is a member.
     */
    public function isMember(): bool
    {
        return $this->role === self::ROLE_MEMBER;
    }

    /**
     * Check if user is approved.
     */
    public function isApproved(): bool
    {
        return (bool) $this->is_approved;
    }
}