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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // 自動遞增主鍵
            $table->string('name'); // 使用者名稱
            $table->string('email')->unique(); // 電子郵件，唯一值
            $table->timestamp('email_verified_at')->nullable(); // 電子郵件驗證時間
            $table->string('password'); // 密碼
            $table->string('image_path')->nullable(); // 使用者頭像圖片路徑
            $table->rememberToken(); // 支援 「記住我（Remember Me）」功能 的欄位
            $table->timestamps();  // 建立和更新時間戳記
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users'); // 刪除 users 資料表
    }
};
