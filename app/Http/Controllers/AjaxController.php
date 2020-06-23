<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductType;

class AjaxController extends Controller
{
    public function getProductType(Request $request){
        $producttype = ProductType::where('idCategory', $request->idCate)->get();
        return response()->json($producttype,200);
    }
}
