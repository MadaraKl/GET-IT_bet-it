<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MatchService;
use Exception;

class SimulateMatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'match:simulate'; 
    /**
    * The console command description.
    *
    * @var string
    */
protected $description = 'Simulates the next upcomming match, distributes money to winning bets, generates new match.';
   
private $matchService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(MatchService $matchService)


    {
        $this->matchService =$matchService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {
            $match = $this->matchService->getNextUpcompingMatch();
            $this->matchService->simulateMatch($match->id);
            $this->matchService->generateMatch();

            $this->info('Match between ' . $match->team_1 . ' and ' . $match->team_2 .' simulated');
            $this->info('A new match has been generated');
        } catch (Exception $e) {
            $this->error($e->getMessage());

        }
    
    }
}
