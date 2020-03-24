<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MatchService;

class MatchController extends Controller
{
    private $matchService;

    public function __construct(MatchService $matchService)
    {
        $this->matchService = $matchService;
    }

    public function getMatches()
    {
        return $this->matchService->getMatches();
    }

    public function getUpcomingMatches()

    {
        $userId = auth()->user()->id;
        return $this->matchService->getUpcomingMatches($userId);
    }
}
