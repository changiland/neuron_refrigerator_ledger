<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inquiry', function (Blueprint $table) {
            $table->id();
            // item_id 作為外鍵，必須用 unsignedBigInteger
            $table->unsignedBigInteger('types_id');

            $table->string('question');
            $table->string('answer');
            // sort_order 排序欄位（預設 0）
            $table->integer('sort_order')->nullable();

            $table->timestamps();

            // 外鍵設定 — 連到 inquiry_types(id)
            $table->foreign('types_id')
                  ->references('id')
                  ->on('inquiry_types')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiry');
    }
};
