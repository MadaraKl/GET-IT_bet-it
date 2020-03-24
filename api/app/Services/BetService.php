<?php

namespace App\Services;

use Exception;
use App\Match;
use App\Bet;

class BetService
{
    private $walletService;

    public function __construct()
    {
        $this->walletService = new WalletService;
    }

    public function makeBet($userId, $matchId, $result, $amount)
    {
        try {
            $match = Match::findOrFail($matchId);
        } catch (Exception $e) {
            throw new Exception("Match not found");
        }

        if ($match->has_finished) {
            throw new Exception("This match has already finished");
        }
        
        $bet = $match->bets()->where('user_id', $userId)->first();

        if ($bet) {
            throw new Exception("You have already made a bet on this match");
        }
        
        switch ($result) {
            case 'team_1_win':
                $coef = $match->team_1_win_coef;
                break;
            case 'team_2_win':
                $coef = $match->team_2_win_coef;
                break;
            case 'draw':
                $coef = $match->draw_coef;
                break;
            default:
                throw new Exception("Please specify a valid result");
        }

        $this->walletService->makeBet($userId, $amount);

        $bet = new Bet([
            'user_id' => $userId,
            'match_id' => $matchId,
            'amount' => $amount,
            'result' => $result,
            'coef' => $coef
        ]);

        $bet->save();
    }
}