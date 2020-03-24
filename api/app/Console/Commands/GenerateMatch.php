<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MatchService;

class GenerateMatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'match:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to generate a new match between two random teams';

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
       $this->matchService->generateMatch();
       $this->info('Match generated');
    }
}