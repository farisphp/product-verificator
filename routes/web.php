<?php

use App\Models\Product;
use App\Models\ProductOwnership;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\ProductChecker;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Models\Verification;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/merchants", [MerchantController::class, "index"])->name(
        "merchants",
    );
    Route::get("/merchants/{merchant}", [
        MerchantController::class,
        "show",
    ])->name("merchants.show");
    Route::post("/merchants", [MerchantController::class, "store"])->name(
        "merchants.store",
    );

    Route::get("/products", [ProductController::class, "index"])->name(
        "products",
    );
    Route::post("/products", [ProductController::class, "store"])->name(
        "products.store",
    );
    Route::get("/products/{product}", [ProductController::class, "show"])->name(
        "products.show",
    );
    Route::put("/products/{product}", [
        ProductController::class,
        "update",
    ])->name("products.update");
    Route::get("/products/bulk-upload", [
        ProductController::class,
        "bulkUpload",
    ])->name("products.bulk_upload");
    Route::get("/products/bulk-upload/template", [
        ProductController::class,
        "bulkTemplate",
    ])->name("products.bulk_upload.template");

    Route::post("/products/{product}/items", [
        ProductItemController::class,
        "store",
    ])->name("products.items.store");

    Route::get("/settings", [SettingsController::class, "index"])->name(
        "settings",
    );

    Route::get("/users", [MerchantController::class, "index"])->name("users");
});

Route::name("invitation.")->group(function () {
    Route::get("/invitation/{invitation}", [
        InvitationController::class,
        "setup",
    ])->name("show");
    Route::post("/invitation/{invitation}", [
        InvitationController::class,
        "register",
    ])->name("register");
});

Route::get("/", function (Request $request) {
    $user = $request->user();
    if ($user->is_admin) {
        $total_products = Product::count();
        $total_claimed = ProductOwnership::count();
        $total_scans = Verification::count();
        $total_alerts = Verification::without("product")->count();
    } else {
        $merchant = $user->getLatestMerchant();
        $total_products = Product::whereBelongsTo($merchant)->count();
        $total_claimed = ProductOwnership::filterByProductMerchant(
            $merchant->id,
        )->count();
        $total_scans = Verification::filterByProductMerchant(
            $merchant->id,
        )->count();
    }

    return Inertia::render("dashboard", [
        "total_products" => $total_products,
        "total_claimed" => $total_claimed,
        "total_scans" => $total_scans,
        "total_alerts" => $total_alerts ?? null,
    ]);
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::get("/verifier", [ProductChecker::class, "index"])->name(
    "product.verifier",
);

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit",
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update",
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy",
    );
});

require __DIR__ . "/auth.php";
