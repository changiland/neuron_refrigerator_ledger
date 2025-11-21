<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $table = 'inquiry';  // <-- 寫你的實際 table 名稱

     public function type()
    {
        return $this->belongsTo(InquiryType::class, 'types_id');
    }

    // 自動遞增 sort_order（每個 type 獨立）
    public static function booted()
    {
        static::creating(function ($inquiry) {
            if (is_null($inquiry->sort_order)) {
                $maxSort = self::where('types_id', $inquiry->types_id)->max('sort_order') ?? 0;
                $inquiry->sort_order = $maxSort + 1;
            }
        });
    }

    protected $fillable = [
        'types_id',
        'question',
        'answer',
        'sort_order',
    ];
}
