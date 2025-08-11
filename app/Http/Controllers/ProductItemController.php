<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductItemRequest;
use App\Http\Requests\UpdateProductItemRequest;
use App\Models\Product;
use App\Models\ProductItem;

class ProductItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreProductItemRequest $request, Product $product)
    {
        $productItem = ProductItem::create([
            "product_id" => $product->id,
            "serial_number" => $request->serial_number,
            "manufacture_date" => $request->manufacture_date,
            "sku" => $request->sku,
            "color" => $request->color,
            "size" => $request->size,
        ]);

        return redirect()
            ->back()
            ->with("success", "Product created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductItem $productItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductItem $productItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductItemRequest $request,
        ProductItem $productItem,
    ) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductItem $productItem)
    {
        //
    }
}
