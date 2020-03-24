<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BetService;
use Exception;

class BetController extends Controller
{
    private $betService;

    public function __construct(BetService $betService)
    {
        
        $this->betService = $betService;
    }

    public function makeBet(Request $request)
    {
        $validatedData = $request->validate([
            'matchId' => 'required',
            'result' => 'required',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $userId = auth()->user()->id;

        $matchId = $request->input('matchId');
        $result = $request->input('result');
        $amount = $request->input('amount');

        try {
            $this->betService->makeBet($userId, $matchId, $result, $amount);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
    
}
