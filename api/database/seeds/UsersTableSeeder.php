<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Wallet;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(User::class, 1)->create();

        foreach ($users as $user) {


        $wallet = new Wallet(
            [
                'user_id' => $user->id
            ]
            );

            $wallet->save();
        }
    }
       
}