<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;

class inventoryTransaction extends Model
{
    use HasFactory;
    public function products()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }
    protected $table = 'inventory_transactions';
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'type',
        'portion_sizes',
        'cost',
        'expiration_date',
    ];
}
