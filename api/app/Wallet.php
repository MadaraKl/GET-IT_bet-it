<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{

   /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id'
    ];

    // Get the user that the wallet belongs to
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Get the cccc that the ccccc belongs to
    public function walletActions()
    {
        return $this->hasMany(WalletAction::class);
    }
}
