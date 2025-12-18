<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryStock extends Model
{
    use HasFactory;

    protected $table = 'inventory_stock';
    protected $fillable = ['user_id', 'product_id', 'quantity', 'expiration_date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id'); // inventory_stock.user_id 對應 users.id
    }
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id', 'id'); // inventory_stock.product_id 對應 products.id
    }
}
