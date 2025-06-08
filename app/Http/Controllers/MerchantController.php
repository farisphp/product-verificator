<?php

namespace App\Http\Controllers;

use App\DefaultRole;
use App\Http\Requests\StoreMerchantRequest;
use App\Http\Requests\UpdateMerchantRequest;
use App\Http\Resources\MerchantCollection;
use App\Models\Invitation;
use App\Models\Merchant;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class MerchantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $page = request()->input("page", 1);
        $per_page = request()->input("per_page", 20);

        return Inertia::render("merchant/index", [
            "merchants" => new MerchantCollection(
                Merchant::orderBy("created_at")
                    ->filter(Request::only("search"))
                    ->paginate($per_page, page: $page)
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMerchantRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $merchantData = $request->safe()->except(["admin_email"]);

            $merchant = Merchant::create($merchantData);

            $adminExist = User::where(
                "email",
                $validated["admin_email"]
            )->first();

            if ($adminExist) {
                $adminExist->merchants()->attach($merchant->id);

                return redirect()
                    ->back()
                    ->with(
                        "success",
                        "Merchant created successfully. Admin invitation has been sent."
                    );
            }

            // Generate a unique token for invitation
            $token = substr(
                hash(
                    "sha256",
                    $merchant->id .
                        $validated["admin_email"] .
                        time() .
                        uniqid()
                ),
                0,
                20
            );

            // Create invitation record
            $invitation = Invitation::create([
                "email" => $validated["admin_email"],
                "token" => $token,
                "role" => DefaultRole::GENERAL_ADMIN,
                "merchant_id" => $merchant->id,
            ]);

            DB::commit();

            // Dispatch job to send invitation email
            dispatch(new \App\Jobs\InviteAdminMerchant($invitation));

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Merchant created successfully. Admin invitation has been sent."
                );
        } catch (Exception $error) {
            DB::rollBack();
            Log::debug($error);
            return redirect()
                ->back()
                ->withErrors(["message" => "Merchant creation failed"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Merchant $merchant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Merchant $merchant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMerchantRequest $request, Merchant $merchant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Merchant $merchant)
    {
        //
    }
}
