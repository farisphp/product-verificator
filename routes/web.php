<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\ProductChecker;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/merchants", [MerchantController::class, "index"])->name(
        "merchants"
    );
    Route::post("/merchants", [MerchantController::class, "store"])->name(
        "merchants.store"
    );

    Route::get("/products", [ProductController::class, "index"])->name(
        "products"
    );
    Route::get("/products/show", [ProductController::class, "show"])->name(
        "products.show"
    );
    Route::get("/products/bulk-upload", [
        ProductController::class,
        "bulkUpload",
    ])->name("products.bulk_upload");
    Route::get("/products/bulk-upload/template", [
        ProductController::class,
        "bulkTemplate",
    ])->name("products.bulk_upload.template");

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

Route::get("/", function () {
    return Inertia::render("Dashboard");
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::get("/verifier", [ProductChecker::class, "index"])->name(
    "product.verifier"
);

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );
});

require __DIR__ . "/auth.php";
