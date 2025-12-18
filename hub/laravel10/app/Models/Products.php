<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categories;

class Products extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id', 'id');
    }
    protected $table = 'products';
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'is_active',
    ];
}
