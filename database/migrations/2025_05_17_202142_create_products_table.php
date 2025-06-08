<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("product_categories", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table
                ->foreignId("merchant_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create("products", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("brand");
            $table
                ->foreignId("category_id")
                ->nullable()
                ->constrained("product_categories")
                ->cascadeOnUpdate()
                ->nullOnDelete();
            $table
                ->foreignId("merchant_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create("product_items", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("product_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string("unique_id");
            $table->timestamp("manufacture_date");

            $table->string("description")->nullable();
            $table->string("sku")->nullable();
            $table->string("material")->nullable();
            $table->string("color")->nullable();
            $table->string("weight")->nullable();
            $table->string("size")->nullable();
            $table->string("dimensions")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("product_items");
        Schema::dropIfExists("products");
        Schema::dropIfExists("product_categories");
    }
};
