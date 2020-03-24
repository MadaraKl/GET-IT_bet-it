<?php

namespace App\Services;

use Exception;
use App\Match;
use App\Team;
use Carbon\Carbon;

class MatchService
{
    private $walletService;

    public function __construct()
    {
        $this->walletService = new WalletService;
    }
        
    public function generateMatch()
    {
        $teams = Team::inRandomOrder()->limit(2)->get();

        $drawChance = rand(10, 50);
        $team1WinChance = rand(10, 100 - $drawChance - 10);
        $team2WinChance = 100 - $drawChance - $team1WinChance;

        $drawCoef = (100 / $drawChance) * 0.9;
        $team1WinCoef = (100 / $team1WinChance) * 0.9;
        $team2WinCoef = (100 / $team2WinChance) * 0.9;
        
        $match = new Match([
            'team_1' => $teams[0]->name,
            'team_2' => $teams[1]->name,
            'team_1_win_chance' => $team1WinChance,
            'team_2_win_chance' => $team2WinChance,
            'draw_chance' => $drawChance,
            'team_1_win_coef' => $team1WinCoef,
            'team_2_win_coef' => $team2WinCoef,
            'draw_coef' => $drawCoef,
            'time' => Carbon::now()->addDay()
        ]);

        $match->save();
    }

    public function simulateMatch($matchId) 
    {
        try {
            $match = Match::findOrFail($matchId);
        } catch (Exception $e) {
            throw new Exception("Match not found");
        }
        if ($match->has_finished) {
            throw new Exception("Match has finished");
        }


    $bets = $match->bets;
   
    $match->has_finished= true;
    $match->result = $this->calculateMatchResult($match);
      $match->save();

      foreach ($bets as $bet) 
        {    
              $bet->is_succesful = $bet->result == $match->result;
              $bet->save();

              if ($bet->is_succesful) 
              {
                $amount = $bet->amount * $bet->coef;
                $this->walletService->awardBet($bet->user_id, $amount); 
              }
        }
    }

    public function calculateMatchResult(Match $match)
    {
        $result = rand(1, 100);

        if ($result <= $match->team_1_win_chance) {
          return 'team_1_win';
        } 

        $result -= $match->team_1_win_chance;

        if($result <= $match->team_2_win_chance) {
            return 'team_2_win';
        }
            return 'draw';   

    }

    public function getMatches()
    {
        $matches = Match::all();

        return $matches;
    }


    public function getMatch($matchId)
    {
        $match = Match::findOrFail($matchId);
        return $match;
    }

    public function getUpcomingMatches($userId = 0)
    {
        if ($userId > 0)
 {

       $matches = Match::withPersonalBets($userId)
        ->where('has_finished', false)
        ->orderBy('time')
        ->get();
    } else {
        $matches = Match::where('has_finished', false)
        ->orderBy('time')
        ->get();
    }

        return $matches;
    }

    public function getNextUpcompingMatch()
    {
        try {
            $match = Match::where('has_finished', false)->orderBy('time')->firstOrFail();
        } catch (Exception $e) {
            throw new Exception("No upcoming matches found");
        }

        return $match;
    }

}
