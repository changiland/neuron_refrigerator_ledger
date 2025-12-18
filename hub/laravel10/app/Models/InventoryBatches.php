<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryBatches extends Model
{
    use HasFactory;
    protected $table = 'inventory_batches';
    protected $fillable = [
        'user_id',
        'product_id',
        'batch_id',
        'quantity',
        'cost',
        'expiration_date',
        'is_active',
    ];
}
