<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InquiryType extends Model
{
    use HasFactory;
    protected $table = 'inquiry_types';

    protected $fillable = [
        'type_name',
    ];
}
