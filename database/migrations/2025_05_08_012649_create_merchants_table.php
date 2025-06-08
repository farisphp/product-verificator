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
        Schema::create("merchants", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("email");
            $table->string("phone");
            $table->string("address");
            $table->text("logo")->nullable();
            $table->string("website")->nullable();
            $table->timestamps();
        });

        Schema::create("merchant_user", function (Blueprint $table) {
            $table
                ->foreignId("user_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table
                ->foreignId("merchant_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger("invited_by")->nullable();
            $table
                ->foreign("invited_by")
                ->references("id")
                ->on("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create("invitations", function (Blueprint $table) {
            $table->id();
            $table->string("email");
            $table->string("token");
            $table->string("role");
            $table
                ->foreignId("merchant_id")
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger("invited_by")->nullable();
            $table
                ->foreign("invited_by")
                ->references("id")
                ->on("users")
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("merchants");
        Schema::dropIfExists("merchant_user");
    }
};
