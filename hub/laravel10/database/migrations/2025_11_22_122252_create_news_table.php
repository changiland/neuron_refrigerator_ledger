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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamp('published_at')->nullable();
            $table->unsignedBigInteger('types_id');
            $table->string('title');
            $table->string('comment');
            // sort_order 排序欄位（預設 0）
            $table->integer('sort_order')->nullable();
            $table->timestamps();

            // 外鍵設定 — 連到 inquiry_types(id)
            $table->foreign('types_id')
                  ->references('id')
                  ->on('news_type')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
