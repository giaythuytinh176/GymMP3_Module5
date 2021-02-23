<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function findCategory(Request $request)
    {
        $data = Category::find($request->id);
        return response()->json($data, 200);
    }

    public function index()
    {
        $data = Category::all();
        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|unique:categories',
            'image' => 'required|url',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $category = new Category();
        $category->fill($request->all());
        $category->save();
        return response()->json(compact(['category']), 200);
    }

    public function show(Category $category)
    {
        //
    }

    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy(Category $category)
    {
        //
    }
}
