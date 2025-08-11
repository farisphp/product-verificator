<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\MerchantCollection;
use App\Http\Resources\ProductCategoryResource;
use App\Http\Resources\ProductItemResource;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Models\Merchant;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize("viewAny", Product::class);
        $merchantId = null;
        if (!$request->user()->is_admin) {
            $merchantId = $request->user()->getLatestMerchant()->id;
        }

        $page = $request->input("page", 1);
        $per_page = $request->input("per_page", 20);

        return Inertia::render("product/index", [
            "products" => fn() => ProductResource::collection(
                Product::orderBy("created_at", "desc")
                    ->filter($request->only("search"))
                    ->paginate($per_page, page: $page),
            ),
            "categories" => fn() => ProductCategoryResource::collection(
                ProductCategory::orderBy("created_at", "desc")
                    ->filter(["search" => $request->input("searchCategory")])
                    ->when($merchantId, function (Builder $query) use (
                        $merchantId,
                    ) {
                        $query->where("merchant_id", $merchantId);
                    })
                    ->limit(10)
                    ->get(),
            ),
            "merchants" => fn() => new MerchantCollection(
                Merchant::orderBy("created_at")
                    ->filter(["search" => $request->input("searchMerchant")])
                    ->limit(5)
                    ->get(),
            ),
        ]);
    }

    public function bulkUpload()
    {
        return Inertia::render("product/bulk-upload");
    }

    public function bulkTemplate()
    {
        return Inertia::render("product/bulk-template");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->authorize("create", Product::class);
        $merchantId = $request->user()->is_admin
            ? $request->merchant_id
            : session("team_id", $request->user()->getLatestMerchant()->id);

        // Handle category creation or retrieval
        $categoryId = is_numeric($request->category)
            ? $request->category
            : ProductCategory::create([
                "name" => $request->category,
                "merchant_id" => $merchantId,
            ])->id;

        $product = Product::create([
            "name" => $request->name,
            "brand" => $request->brand,
            "category_id" => $categoryId,
            "merchant_id" => $merchantId,
            "material" => $request->material,
            "description" => $request->description,
            "colors" => $request->colors ? json_encode($request->colors) : null,
            "sizes" => $request->sizes ? json_encode($request->sizes) : null,
        ]);

        return redirect()
            ->back()
            ->with("success", "Product created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Product $product)
    {
        $this->authorize("view", Product::class);
        $merchantId = null;
        if (!$request->user()->is_admin) {
            $merchantId = $request->user()->getLatestMerchant()->id;
        }

        // Paginate the product items
        $page = $request->input("page", 1);
        $perPage = $request->input("per_page", 20);

        return Inertia::render("product/detail", [
            "product" => $product->toResource(),
            "items" => fn() => ProductItemResource::collection(
                $product
                    ->items()
                    ->filter($request->only("search"))
                    ->paginate($perPage, page: $page),
            ),
            "categories" => fn() => ProductCategoryResource::collection(
                ProductCategory::orderBy("created_at", "desc")
                    ->filter(["search" => $request->input("searchCategory")])
                    ->when($merchantId, function (Builder $query) use (
                        $merchantId,
                    ) {
                        $query->where("merchant_id", $merchantId);
                    })
                    ->limit(10)
                    ->get(),
            ),
            "merchants" => fn() => new MerchantCollection(
                Merchant::orderBy("created_at")
                    ->filter(["search" => $request->input("searchMerchant")])
                    ->limit(5)
                    ->get(),
            ),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize("update", $product);
        $merchantId = $request->user()->is_admin
            ? $request->merchant_id
            : session("team_id", $request->user()->getLatestMerchant()->id);

        // Handle category creation or retrieval
        $categoryId = is_numeric($request->category)
            ? $request->category
            : ProductCategory::create([
                "name" => $request->category,
                "merchant_id" => $merchantId,
            ])->id;

        $product->update([
            "name" => $request->name ?? $product->name,
            "brand" => $request->brand ?? $product->brand,
            "category_id" => $categoryId,
            "material" => $request->material ?? $product->material,
            "description" => $request->description ?? $product->description,
            "colors" => $request->colors,
            "sizes" => $request->sizes,
        ]);
        return redirect()
            ->back()
            ->with("success", "Product updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->authorize("delete", $product);
        $product->delete();

        return redirect()
            ->back()
            ->with("success", "Product deleted successfully.");
    }
}
