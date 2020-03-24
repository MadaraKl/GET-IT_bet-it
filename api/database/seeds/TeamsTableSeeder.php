<?php

use Illuminate\Database\Seeder;
use App\Team;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teams = [
            'FK Ventspils',
            'FK Spartaks Jūrmala',
            'FK Jelgava',
            'FK Liepāja',
            'Riga FC',
            'FK Rīgas Futbola Skola',
            'FS METTA/Latvijas Universitāte',
            'Valmieras FK (Valmiera FC)',
            'Skonto FC',
            'BFC Daugavpils',
            'FK Liepājas Metalurgs',
            'FK Daugava (FK Daugava Rīga)',
            'FC Daugava',
            'FK Tukums 2000',
            'SK Babīte',
            'FB Gulbene'
        ];

        foreach ($teams as $teamName) {
            $team = new Team(['name' => $teamName]);
            $team->save();
        }
    }
}