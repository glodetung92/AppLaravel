<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name', 'slug', 'description', 'quantity', 'price', 'promotional', 'idCategory', 'idProductType', 'image', 'status'
    ];

    public function productTypes() {
        return $this->belongsTo('App\Models\ProductType', 'idProductType', 'id');
    }

    public function Categorys() {
        return $this->belongsTo('App\Models\Category', 'idCategory', 'id');
    }
}
