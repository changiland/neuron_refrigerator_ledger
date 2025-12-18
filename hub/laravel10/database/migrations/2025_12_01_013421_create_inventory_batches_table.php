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
        Schema::create('inventory_batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // 所屬帳號，不可為 NULL  對應 users.id 外鍵，帳號刪除時 cascade 刪除交易紀錄
            $table->string('batch_id', 100)->nullable(); // 批次 ID,$table->uuid('batch_id')->unique();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete(); // 產品 ID，對應 products.id 外鍵，產品刪除時設置為 NULL
            $table->integer('quantity'); // 批次數量
            $table->decimal('cost', 20, 2)->nullable();  // 入庫金額
            $table->timestamp('expiration_date')->nullable(); // 到期日
            $table->boolean('is_active')->default(true); // 是否啟用
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_batches');
    }
};
