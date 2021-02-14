<?php

namespace App\Http\Controllers;

use App\Models\Singer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SingerController extends Controller
{
    public function index()
    {
        $data = Singer::all();
        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'singer_name' => 'required|string|unique:singers',
            'image' => 'required|url',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $singer = new Singer();
        $singer->fill($request->all());
        $singer->save();
        return response()->json(compact(['singer']), 200);
    }

    public function show(Singer $singer)
    {
        //
    }

    public function update(Request $request, Singer $singer)
    {
        //
    }

    public function destroy(Singer $singer)
    {
        //
    }
}
