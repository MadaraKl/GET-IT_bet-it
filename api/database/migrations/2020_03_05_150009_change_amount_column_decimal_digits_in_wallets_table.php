<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use app\Wallet;

class ChangeAmountColumnDecimalDigitsInWalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('wallets', function (Blueprint $table) {
            $table->decimal('amount', 12, 4)->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Wallet::where('id', '>', '0')->update(['amount' => 0]);

        Schema::table('wallets', function (Blueprint $table) {
            $table->decimal('amount', 8, 4)->default(0)->change();
        });
    }
}
