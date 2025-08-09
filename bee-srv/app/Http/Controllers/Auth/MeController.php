<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeController
{
    public function __invoke(Request $request)
    {
        return response()->json($request->user());
    }
}
