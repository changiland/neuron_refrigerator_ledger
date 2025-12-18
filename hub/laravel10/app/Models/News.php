<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

     protected $table = 'news';  // <-- 寫你的實際 table 名稱


     public function type()
    {
        return $this->belongsTo(News_type::class, 'types_id'); // 假設 News_type 是你的類型模型
    }

    // 自動遞增 sort_order（每個 type 獨立）
    public static function booted()
    {
        static::creating(function ($news) {
            if (is_null($news->sort_order)) {
                $maxSort = self::where('types_id', $news->types_id)->max('sort_order') ?? 0;
                $news->sort_order = $maxSort + 1;
            }
        });
    }

    protected $fillable = [
        'types_id',
        'published_at',
        'title',
        'comment',
        'sort_order',
    ];
}
