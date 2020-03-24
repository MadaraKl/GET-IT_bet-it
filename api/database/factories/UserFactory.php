<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {

    $name = $faker->name;
    $lastName = $faker->lastName;
    $userName = Str::snake($name . $lastName);


    return [
        'name' => $name,
        'last_name' => $lastName,
        'username' => $userName,
        'birthday' => $faker->dateTimeBetween('-80 years', '-18 years'),
        'address' => $faker->address,
        'password' => bcrypt('changeme')
    ];
});
// randomaizers