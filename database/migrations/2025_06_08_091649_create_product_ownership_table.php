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
        Schema::create("product_ownership", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("product_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table
                ->foreignId("owner_id")
                ->constrained("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->timestamps();
        });

        Schema::create("ownership_history", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("product_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table
                ->foreignId("owner_id")
                ->constrained("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table
                ->foreignId("previous_owner_id")
                ->nullable()
                ->constrained("users")
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("product_ownership");
        Schema::dropIfExists("ownership_history");
    }
};
