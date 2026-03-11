<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Sector;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the default registration view (optional, keep as is).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle the default registration (kept for compatibility, but not used).
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Show the member registration form (supports both public and ACCI).
     */
    public function createMember(): Response
    {
        $sectors = Sector::where('is_active', true)->get(['id', 'name']);
        return Inertia::render('Auth/RegisterMember', [
            'sectors' => $sectors,
        ]);
    }

    /**
     * Handle member registration (public or ACCI).
     */
    public function storeMember(Request $request): RedirectResponse
    {
        $subtype = $request->input('member_subtype'); // 'public' or 'acci'

        // Base rules common to both subtypes
        $baseRules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Password::defaults()],
        ];

        if ($subtype === 'public') {
            $validated = $request->validate($baseRules);
            $validated['member_subtype'] = 'public';
            $validated['role'] = 'member';
            $validated['is_approved'] = false;
            // No extra fields for public members
        } elseif ($subtype === 'acci') {
            $rules = array_merge($baseRules, [
                'gender' => 'required|in:male,female,other',
                'organization_name' => 'required|string|max:255',
                'contact_person' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'sector_id' => 'required|exists:sectors,id',
                'membership_tier' => 'required|in:VIP,Gold,Platinum,Entrepreneur',
                'membership_id' => 'required|string|unique:users,membership_id',
                'membership_issue_date' => 'required|date',
                'membership_expiry_date' => 'required|date|after:membership_issue_date',
            ]);

            $validated = $request->validate($rules);
            $validated['member_subtype'] = 'acci';
            $validated['role'] = 'member';
            $validated['is_approved'] = false;
        } else {
            return back()->withErrors(['member_subtype' => 'Invalid member type.']);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'is_approved' => $validated['is_approved'],
            'member_subtype' => $validated['member_subtype'] ?? null,
            // ACCI-specific fields (only present if subtype is acci)
            'gender' => $validated['gender'] ?? null,
            'organization_name' => $validated['organization_name'] ?? null,
            'contact_person' => $validated['contact_person'] ?? null,
            'position' => $validated['position'] ?? null,
            'sector_id' => $validated['sector_id'] ?? null,
            'membership_tier' => $validated['membership_tier'] ?? null,
            'membership_id' => $validated['membership_id'] ?? null,
            'membership_issue_date' => $validated['membership_issue_date'] ?? null,
            'membership_expiry_date' => $validated['membership_expiry_date'] ?? null,
        ]);

        event(new Registered($user));

        // Do NOT log the user in; redirect to pending page
        return redirect()->route('registration.pending');
    }

    /**
     * Show the buyer registration form.
     */
    public function createBuyer(): Response
    {
        return Inertia::render('Auth/RegisterBuyer');
    }

    /**
     * Handle buyer registration.
     */
    public function storeBuyer(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'organization_type' => 'required|string|max:255',
            'registration_number' => 'nullable|string|max:255',
            'contact_person' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['contact_person'],           // Set the user's name to the contact person
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'buyer',
            'is_approved' => false,
            'phone' => $validated['phone'],
            'organization_name' => $validated['organization_name'],
            'organization_type' => $validated['organization_type'],
            'registration_number' => $validated['registration_number'] ?? null,
            'contact_person' => $validated['contact_person'], // Store same value in dedicated column
            'position' => $validated['position'],
            'address' => $validated['address'] ?? null,
            'website' => $validated['website'] ?? null,
        ]);

        event(new Registered($user));

        return redirect()->route('registration.pending');
    }
}