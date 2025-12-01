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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete(); // null為共用分類,刪除為帳號時 cascade 刪除分類
            $table->string('name');
            $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete(); // 父分類 ID，可為 NULL，對應 categories.id 外鍵，分類刪除時設置為 NULL
            // $table->string('code',10)->nullable(); // 分類代碼，可為 NULL
            $table->boolean('is_active')->default(true); // 是否啟用
            $table->timestamps(); // 建立和更新時間
            $table->softDeletes(); // 軟刪除
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
