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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // 所屬帳號，不可為 NULL  對應 users.id 外鍵，帳號刪除時 cascade 刪除商品
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete(); // 所屬分類，可為 NULL，對應 categories.id 外鍵，分類刪除時設置為 NULL
            // $table->string('sku', 50); // SKU，可用分類代碼+子分類代碼+流水號生成 // 對外識別商品，非主鍵
            $table->string('name'); // 商品名稱
            // $table->text('description')->nullable(); // 商品描述
            // $table->string('unit', 50)->nullable(); // 單位，例如 kg、盒、包
            // $table->decimal('cost', 10, 2)->nullable();  // 標準成本（可選）
            // $table->decimal('price', 10, 2)->nullable(); // 建議售價（可選）
            $table->boolean('is_active')->default(true);  // 是否啟用，軟停用商品而不刪除
            $table->timestamps();   // created_at + updated_at
            $table->softDeletes(); // deleted_at，用於軟刪除商品
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
