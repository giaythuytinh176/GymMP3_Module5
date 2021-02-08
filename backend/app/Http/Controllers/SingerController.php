<?php

namespace App\Http\Controllers;

use App\Models\Singer;
use Illuminate\Http\Request;

class SingerController extends Controller
{
    public function index()
    {
        $data = Singer::all();
        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        //
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
