<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News_type extends Model
{
    use HasFactory;

     protected $table = 'news_type';  // <-- 寫你的實際 table 名稱

     protected $fillable = [
        'type_name',
    ];
}
