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
        Schema::create('inventory_monthly_ledger', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // 所屬帳號，不可為 NULL  對應 users.id 外鍵，帳號刪除時 cascade 刪除交易紀錄
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete(); // 產品 ID，對應 products.id 外鍵，產品刪除時設置為 NULL
            $table->string('month', 7); // 年月，格式 YYYY-MM
            $table->integer('transactions_in'); // 本月入庫數量
            $table->decimal('value_in', 20, 2); // 本月入庫金額
            // $table->integer('transactions_out'); // 本月出庫數量
            // $table->decimal('value_out', 20, 2); // 本月出庫金額
            // $table->integer('starting_quantity'); // 月初庫存數量
            // $table->integer('ending_quantity'); // 月末庫存數量
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_monthly_ledger');
    }
};
