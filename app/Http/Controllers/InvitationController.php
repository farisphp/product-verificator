<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInvitationRequest;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function setup(Request $request, Invitation $invitation)
    {
        $token = $request->input("token") ?? "";

        $isTokenValid = hash_equals($invitation->token, $token);

        return Inertia::render("merchant/setup", [
            "invitation" => $isTokenValid
                ? $invitation->loadMissing("merchant")
                : null,
        ]);
    }

    public function register(
        AcceptInvitationRequest $request,
        Invitation $invitation
    ) {
        $token = $request->input("token") ?? "";

        $isTokenValid = hash_equals($invitation->token, $token);

        if (!$isTokenValid) {
            return redirect()
                ->back()
                ->withErrors(["message" => "Failed to verify token"]);
        }

        DB::transaction(function () use ($request, $invitation) {
            $user = User::create([
                "name" => $request->name,
                "email" => $invitation->email,
                "password" => Hash::make($request->password),
                "email_verified_at" => now(),
            ]);
            $user->merchants()->attach($invitation->merchant->id, [
                "role" => $invitation->role,
                "invited_by" => $invitation->user_id,
            ]);

            event(new Registered($user));
            Auth::login($user);

            setPermissionsTeamId($invitation->merchant->id);
            $user->assignRole($invitation->role);
            $invitation->delete();
        });

        return redirect(route("dashboard", absolute: false));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        //
    }
}
