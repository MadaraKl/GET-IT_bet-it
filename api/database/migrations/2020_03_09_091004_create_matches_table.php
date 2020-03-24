<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('team_1');
            $table->string('team_2');
            $table->integer('team_1_win_chance');
            $table->integer('team_2_win_chance');
            $table->integer('draw_chance');
            $table->decimal('team_1_win_coef', 6, 2);
            $table->decimal('team_2_win_coef', 6, 2);
            $table->decimal('draw_coef', 6, 2);
            $table->dateTime('time');
            $table->boolean('has_finished')->default(false);
            $table->enum('result', ['team_1_win', 'team_2_win', 'draw'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
