<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categories extends Model
{
    use HasFactory;
    public function products()
    {
        return $this->hasMany(Products::class, 'category_id', 'id'); // 一對多關聯
    }
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'parent_id',
        'is_active',
        'user_id',
    ];
}
