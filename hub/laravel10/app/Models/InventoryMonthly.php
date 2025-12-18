<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryMonthly extends Model
{
    use HasFactory;
    protected $table = 'inventory_monthly_ledger';
    protected $fillable = ['user_id', 'product_id', 'month', 'transactions_in', 'value_in'];
    public $timestamps = false; // 關閉自動 timestamps
}
